import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UsersService } from '../app/users/users.service';
import { CreateUserDto } from '../app/users/dto/create-user.dto';
import { ActivePrinciplesService } from '../app/active-principles/active-principles.service';
import { CreateActivePrincipleDto } from '../app/active-principles/dto/create-active-principle.dto';
import { PresentationsService } from '../app/presentations/presentations.service';
import { PackagesService } from '../app/packages/packages.service';
import { CreatePackageDto } from '../app/packages/dto/create-package.dto';
import { CreatePresentationDto } from '../app/presentations/dto/create-presentation.dto';
import { MedicinesService } from '../app/medicines/medicines.service';
import { CreateMedicineDto } from '../app/medicines/dto/create-medicine.dto';
import { CreateMedicinesActivePrincipleDto } from 'src/app/medicines-active-principles/dto/create-medicines-active-principle.dto';
import { MedicinesActivePrinciplesService } from 'src/app/medicines-active-principles/medicines-active-principles.service';
import { Action } from './dto/load.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Excel = require('exceljs');

@Injectable()
export class AppService {
  constructor(
    private usersService: UsersService,
    private activePrinciplesService: ActivePrinciplesService,
    private medicinesService: MedicinesService,
    private packagesService: PackagesService,
    private presentationsService: PresentationsService,
    private medicinesActivePrinciplesService: MedicinesActivePrinciplesService,
  ) {}

  async loadMedicines(
    data: Express.Multer.File,
    sheet: string,
    action: Action,
  ) {
    try {
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(data.buffer);

      const worksheet = workbook.getWorksheet(sheet);

      const locationColArray = worksheet.getColumn(1).values;

      const medicineColArray = worksheet.getColumn(2).values;

      const activePrincipleColArray = worksheet.getColumn(3).values;

      const packageColArray = worksheet.getColumn(4).values;

      const presentationColArray = worksheet.getColumn(5).values;

      const concentrationColArray = worksheet.getColumn(6).values;

      const newMedicine: any = [];

      const newActivePrinciples: any = [];

      const newPackage: any = [];

      const newPresentation: any = [];

      const newConcentration: any = [];

      activePrincipleColArray.map(
        async (activePrinciple: any, index: number) => {
          let medicine = medicineColArray[index];
          let location = locationColArray[index];
          let packageData = packageColArray[index];
          let presentation = presentationColArray[index];
          let concentration = concentrationColArray[index];

          if (index !== 4) {
            if (typeof medicine === 'object') {
              const nameArray = medicine.richText;
              medicine = nameArray[0].text;
            }
            medicine = medicine ? medicine.trim() : 's/i';

            if (typeof location === 'object') {
              const nameArray = location.richText;
              location = nameArray[0].text;
            }
            location = location ? location.trim() : 's/i';

            newMedicine.push({
              name: medicine.toUpperCase(),
              location: location.toUpperCase(),
            });

            if (typeof activePrinciple === 'object') {
              const nameArray = activePrinciple.richText;
              activePrinciple = nameArray[0].text;
            }

            if (action === Action.CARGAR) {
              activePrinciple.split('/').map((value: string) => {
                value = value.replace(/\s+/g, ' ');

                newActivePrinciples.push({
                  name: value.trim().toUpperCase(),
                });
              });
            } else if (action === Action.REGISTRAR) {
              activePrinciple = activePrinciple
                ? activePrinciple.trim()
                : 's/i';
              newActivePrinciples.push({
                name: activePrinciple.toUpperCase(),
              });
            }

            if (typeof packageData === 'object') {
              const nameArray = packageData.richText;
              packageData = nameArray[0].text;
            }
            packageData = packageData ? packageData.trim() : 's/i';

            newPackage.push({ name: packageData.toUpperCase() });

            if (typeof presentation === 'object') {
              const nameArray = presentation.richText;
              presentation = nameArray[0].text;
            }
            presentation = presentation ? presentation.trim() : 's/i';
            newPresentation.push({ name: presentation.toUpperCase() });

            if (typeof concentration === 'object') {
              const nameArray = presentation.richText;
              concentration = nameArray[0].text;
            }
            concentration = concentration ? concentration.trim() : 's/i';
            newConcentration.push({ name: concentration.toUpperCase() });
          }
        },
      );

      if (action === Action.CARGAR) {
        console.log('entro en cargar');

        const uniqueMedicineArray = this.removeDuplicates(newMedicine, 'name');

        const uniqueActivePrinciplesArray = this.removeDuplicates(
          newActivePrinciples,
          'name',
        );

        const uniquePackageArray = this.removeDuplicates(newPackage, 'name');

        const uniquePresentationArray = this.removeDuplicates(
          newPresentation,
          'name',
        );

        return Promise.all([
          await this.registerMedicine(uniqueMedicineArray),
          await this.registerActivePrinciple(uniqueActivePrinciplesArray),
          await this.registerPackage(uniquePackageArray),
          await this.registerPresentation(uniquePresentationArray),
        ]);
      } else if (action === Action.REGISTRAR) {
        console.log('entro en registro');
        await this.registerMedicineHasActivePrinciples(
          newMedicine,
          newActivePrinciples,
          newPackage,
          newPresentation,
          newConcentration,
        );
      }
    } catch (error: any) {
      Logger.error(error, AppService.name);

      throw new InternalServerErrorException();
    }
  }

  async registerMedicineHasActivePrinciples(
    newMedicine: any[],
    newActivePrinciples: any[],
    newPackage: any[],
    newPresentation: any[],
    newConcentration: any[],
  ) {
    let arrayData: any = [];
    await Promise.all(
      newMedicine.map(async (medicine: any, index: number) => {
        const activePrinciple = newActivePrinciples[index];
        const packageData = newPackage[index];
        const presentation = newPresentation[index];
        const concentration = newConcentration[index];
        let activePrincipleFound = null;

        const medicineFound = await this.medicinesService.findByName(
          medicine.name,
        );

        const packageFound = await this.packagesService.findByName(
          packageData.name,
        );

        const presentationFound = await this.presentationsService.findByName(
          presentation.name,
        );

        const data: CreateMedicinesActivePrincipleDto = {
          medicineId: medicineFound.id,
          activePrincipleId: activePrincipleFound ? activePrincipleFound.id : 0,
          packageId: packageFound.id,
          presentationId: presentationFound.id,
          stock: 0,
          concentration: '',
        };

        const processActivePrinciple = async (value: string, index: number) => {
          value = value.replace(/\s+/g, ' ');

          const activePrincipleFound =
            await this.activePrinciplesService.findByName(value.trim());
          const concentrationData = concentration.name.includes('/')
            ? concentration.name.split('/')
            : ['S/I'];

          const newData: CreateMedicinesActivePrincipleDto = {
            ...data,
            activePrincipleId: activePrincipleFound.id,
            concentration: concentrationData[index]
              ? concentrationData[index].trim()
              : 'S/I',
          };

          arrayData.push(newData);
        };

        if (activePrinciple.name.includes('/')) {
          await Promise.all(
            activePrinciple.name.split('/').map(processActivePrinciple),
          );
        } else {
          const cleanedActivePrincipleName = activePrinciple.name
            .replace(/\s+/g, ' ')
            .trim();
          activePrincipleFound = await this.activePrinciplesService.findByName(
            cleanedActivePrincipleName,
          );
          data.activePrincipleId = activePrincipleFound.id;
          data.concentration = concentration.name.trim();
          arrayData.push(data);
        }

        if (newMedicine.length - 1 === index) {
          console.log('soy el ultimo', arrayData.length);

          arrayData = arrayData.sort(
            (a: { medicineId: number }, b: { medicineId: number }) =>
              b.medicineId - a.medicineId,
          );

          const uniqueArray = this.removeDuplicatesMultiple(arrayData);

          const createMedicinesActivePrinciples = async (value) => {
            const medicinesHasActivePrinciples =
              await this.medicinesActivePrinciplesService.create(value);
            console.log('response>', medicinesHasActivePrinciples.id);
          };

          await Promise.all(uniqueArray.map(createMedicinesActivePrinciples));
        }
      }),
    );
  }

  async registerMedicine(medicines: any) {
    try {
      return Promise.all(
        medicines.map(async (medicine: { name: string; location: string }) => {
          const { name, location } = medicine;

          const medicineFound = await this.medicinesService.findByName(name);

          if (!medicineFound) {
            const data: CreateMedicineDto = {
              name,
              location,
            };

            return await this.medicinesService.create(data);
          }
        }),
      );
    } catch (error) {
      return error;
    }
  }

  async registerActivePrinciple(activePrinciples: any) {
    try {
      return Promise.all(
        activePrinciples.map(async (activePrinciple: { name: string }) => {
          const { name } = activePrinciple;

          const activePrincipleFound =
            await this.activePrinciplesService.findByName(name);

          if (!activePrincipleFound) {
            const data: CreateActivePrincipleDto = {
              name,
            };

            return await this.activePrinciplesService.create(data);
          }
        }),
      );
    } catch (error) {
      return error;
    }
  }

  async registerPackage(packages: any) {
    try {
      return Promise.all(
        packages.map(async (packageData: { name: string }) => {
          const { name } = packageData;

          const packageFound = await this.packagesService.findByName(name);

          if (!packageFound) {
            const data: CreatePackageDto = {
              name,
            };

            return await this.packagesService.create(data);
          }
        }),
      );
    } catch (error) {
      return error;
    }
  }

  async registerPresentation(presentations: any) {
    try {
      return Promise.all(
        presentations.map(async (presentation: { name: string }) => {
          const { name } = presentation;

          const presentationFound = await this.presentationsService.findByName(
            name,
          );

          if (!presentationFound) {
            const data: CreatePresentationDto = {
              name,
            };

            return await this.presentationsService.create(data);
          }
        }),
      );
    } catch (error) {
      return error;
    }
  }

  async registerMedicinesHasActivePrinciples(presentations: any) {
    try {
      return Promise.all(
        presentations.map(async (presentation: { name: string }) => {
          const { name } = presentation;

          const presentationFound = await this.presentationsService.findByName(
            name,
          );

          if (!presentationFound) {
            const data: CreatePresentationDto = {
              name,
            };

            return await this.presentationsService.create(data);
          }
        }),
      );
    } catch (error) {
      return error;
    }
  }

  ////////////

  async loadUsers(data: Express.Multer.File, sheet: string) {
    try {
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(data.buffer);

      const worksheet = workbook.getWorksheet(sheet);

      const codeColArray = worksheet.getColumn(2).values;

      const lastNameColArray = worksheet.getColumn(3).values;

      const nameColArray = worksheet.getColumn(4).values;

      const identificationNumberColArray = worksheet.getColumn(42).values;

      const newUsers: any = [];

      codeColArray.map(async (code: any, index: number) => {
        let name = nameColArray[index];
        let note = '';
        const lastName = lastNameColArray[index];
        const identificationNumber = identificationNumberColArray[index];

        if (index !== 1) {
          if (typeof nameColArray[index] === 'object') {
            const nameArray = nameColArray[index].richText;
            name = nameArray[0].text;

            if (nameArray.length === 3) {
              note = nameArray[2].text.trim().replace('(', '').replace(')', '');
            } else if (nameArray.length === 2) {
              note = nameArray[1].text.trim().replace('(', '').replace(')', '');
            }
          }

          name = name ? name : 's/i';
          const nameSlit = name.split('(');
          name = nameSlit[0].trim();
          note = nameSlit.length === 2 ? nameSlit[1].replace(')', '') : note;

          newUsers.push({
            code,
            name,
            lastName: lastName ? lastName.trim() : 's/i',
            identificationNumber: identificationNumber
              ? identificationNumber.toString().replace(/[^0-9]+/g, '')
              : '',
            note,
          });
        }
      });

      const uniqueArray = this.removeDuplicates(newUsers, 'code');

      await this.registerUser(uniqueArray);
    } catch (error: any) {
      Logger.error(error, AppService.name);

      throw new InternalServerErrorException();
    }
  }

  async cell(data: Express.Multer.File) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(data.buffer);

    const worksheet = workbook.getWorksheet('CCS 0322');

    worksheet.eachRow(
      (
        row: {
          eachCell: (
            arg0: (cell: any, colNumber: any) => Promise<void>,
          ) => void;
        },
        rowNumber: any,
      ) => {
        row.eachCell(async (cell: { value: any }, colNumber: any) => {
          // Accede al valor de la celda con cell.value
          console.log(
            `col: ${colNumber}|| row: ${rowNumber} - Valor de la celda: ${cell.value}`,
          );
        });
        console.log(
          '------------------------------------------------------------ \n',
        );
      },
    );
  }

  async registerUser(users: any) {
    Promise.all(
      users.map(
        async (user: {
          code: string;
          name: string;
          lastName: string;
          identificationNumber: string;
          note: string;
        }) => {
          const { code, name, lastName, identificationNumber, note } = user;
          const userFound = await this.usersService.findByCode(code);

          if (!userFound) {
            const data: CreateUserDto = {
              name,
              lastName,
              code,
              identificationNumber,
              note,
            };

            await this.usersService.create(data);
          }
        },
      ),
    );
  }

  removeDuplicates(originalArray: { [x: string]: any }, prop: string) {
    const newArray = [];
    const lookupObject = {};

    for (const i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (const i in lookupObject) {
      newArray.push(lookupObject[i]);
    }

    return newArray;
  }

  removeDuplicatesMultiple(originalArray: any[]) {
    const filteredData = originalArray.filter(
      (objeto, index, self) =>
        index ===
        self.findIndex(
          (o) =>
            o.medicineId === objeto.medicineId &&
            o.activePrincipleId === objeto.activePrincipleId &&
            o.packageId === objeto.packageId &&
            o.presentationId === objeto.presentationId &&
            o.concentration === objeto.concentration,
        ),
    );

    return filteredData;
  }
}