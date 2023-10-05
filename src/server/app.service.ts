import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PatientsService } from '../app/patients/patients.service';
import { CreatePatientDto } from '../app/patients/dto/create-patient.dto';
import { ActivePrinciplesService } from '../app/active-principles/active-principles.service';
import { CreateActivePrincipleDto } from '../app/active-principles/dto/create-active-principle.dto';
import { PresentationsService } from '../app/presentations/presentations.service';
import { PackagesService } from '../app/packages/packages.service';
import { CreatePackageDto } from '../app/packages/dto/create-package.dto';
import { CreatePresentationDto } from '../app/presentations/dto/create-presentation.dto';
import { MedicinesService } from '../app/medicines/medicines.service';
import { CreateMedicineDto } from '../app/medicines/dto/create-medicine.dto';
import { CreateMedicinesActivePrincipleDto } from '../app/medicines-active-principles/dto/create-medicines-active-principle.dto';
import { MedicinesActivePrinciplesService } from '../app/medicines-active-principles/medicines-active-principles.service';
import { Action } from './dto/load.dto';
import { CommercialPresentationsService } from '../app/commercial-presentations/commercial-presentations.service';
import { CreateCommercialPresentationDto } from '../app/commercial-presentations/dto/create-commercial-presentation.dto';
import { EntranceOfMedicinesService } from '../app/entrance-of-medicines/entrance-of-medicines.service';
import { CreateEntranceOfMedicineDto } from '../app/entrance-of-medicines/dto/create-entrance-of-medicine.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Excel = require('exceljs');

interface MedicineInfo {
  medicineId: number;
  medicineName: string;
  commercialPresentationId: number;
  activePrincipleId: number;
  packageId: number;
  presentationId: number;
  concentration: string;
}

@Injectable()
export class AppService {
  constructor(
    private patientsService: PatientsService,
    private activePrinciplesService: ActivePrinciplesService,
    private medicinesService: MedicinesService,
    private commercialPresentationsService: CommercialPresentationsService,
    private packagesService: PackagesService,
    private presentationsService: PresentationsService,
    private entranceOfMedicinesService: EntranceOfMedicinesService,
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

      const boxesQuantityColArray = worksheet.getColumn(7).values;

      const unitQuantityColArray = worksheet.getColumn(8).values;

      const expirationColArray = worksheet.getColumn(10).values;

      const expireyColArray = worksheet.getColumn(11).values;

      const donorColArray = worksheet.getColumn(13).values;

      const newMedicine: any = [];

      const newActivePrinciples: any = [];

      const newPackage: any = [];

      const newPresentation: any = [];

      const newConcentration: any = [];

      const newEntraceOfMedicines: any = [];

      activePrincipleColArray.map(
        async (activePrinciple: any, index: number) => {
          let medicine = medicineColArray[index];
          let location = locationColArray[index];
          let packageData = packageColArray[index];
          let presentation = presentationColArray[index];
          let concentration = concentrationColArray[index];

          let boxesQuantity = boxesQuantityColArray[index];
          let unitQuantity = unitQuantityColArray[index];
          const expiration = expirationColArray[index];
          const expire = expireyColArray[index];
          const donor = donorColArray[index];

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
            } else if (action === Action.ENTRADAS) {
              if (typeof unitQuantity === 'object') {
                unitQuantity = unitQuantity.result ? unitQuantity.result : 0;
              }

              if (typeof boxesQuantity === 'object') {
                boxesQuantity = boxesQuantity.result ? boxesQuantity.result : 0;
              }
              concentration = concentration
                ? concentration
                    .toUpperCase()
                    .split('/')
                    .map((value: string) => value.trim())
                    .join(' ')
                : 'S/I';

              newEntraceOfMedicines.push({
                medicine: medicine.toUpperCase(),
                concentration,
                activePrinciple: activePrinciple
                  ? activePrinciple.trim()
                  : 'S/I',
                boxesQuantity: boxesQuantity ? boxesQuantity : 0,
                unitQuantity: unitQuantity ? unitQuantity : 0,
                expiration,
                packageData: packageData.toUpperCase(),
                presentation: presentation.toUpperCase(),
                expire: expire.result === 'EXPIRO' ? true : false,
                donor,
              });
            }
          }
        },
      );

      if (action === Action.CARGAR) {
        Logger.verbose('Accion de cargar');

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
        Logger.verbose('Accion de registro');

        await this.registerMedicineHasActivePrinciples(
          newMedicine,
          newActivePrinciples,
          newPackage,
          newPresentation,
          newConcentration,
        );
      } else if (action === Action.ENTRADAS) {
        Logger.verbose('Accion de registro de entradas de medicamentos');
        await this.registerEntranceOfMedicines(newEntraceOfMedicines);
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

    for (const [index, medicine] of newMedicine.entries()) {
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

      const data = {
        medicineId: medicineFound.id,
        medicineName: medicineFound.name,
        commercialPresentationId: 0,
        activePrincipleId: activePrincipleFound ? activePrincipleFound.id : 0,
        packageId: packageFound.id,
        presentationId: presentationFound.id,
        concentration: '',
      };

      const processActivePrinciple = async (value: string, index: number) => {
        value = value.replace(/\s+/g, ' ');

        const activePrincipleFound =
          await this.activePrinciplesService.findByName(value.trim());

        const concentrationData =
          concentration.name.includes('/') &&
          !concentration.name.includes('S/I')
            ? concentration.name.split('/')
            : ['S/I'];

        const newData = {
          ...data,
          activePrincipleId: activePrincipleFound.id,
          concentration: concentrationData[index]
            ? concentrationData[index].trim()
            : 'S/I',
        };
        console.log('newData', newData);
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
        console.log('ultimo \n');

        arrayData = arrayData.sort(
          (a: { medicineId: number }, b: { medicineId: number }) =>
            b.medicineId - a.medicineId,
        );

        const uniqueArray: any = this.removeDuplicatesMultiple(arrayData);

        const transformedArray = this.transformArray(uniqueArray);

        await this.processCommercial(transformedArray);

        await this.createMedicinesActivePrinciples(uniqueArray);
      }
    }
  }

  async processCommercial(data: any) {
    for (const value of data) {
      const dataCommercial: CreateCommercialPresentationDto = {
        name: value.medicineName,
        stock: 0,
        medicineId: value.medicineId,
        packageId: value.packageId,
        presentationId: value.presentationId,
      };

      console.log('dataCommercial>>', dataCommercial);

      await this.commercialPresentationsService.create(dataCommercial);
    }
  }

  async createMedicinesActivePrinciples(data) {
    for (const value of data) {
      const commercialPresentation =
        await this.commercialPresentationsService.findAll({
          medicineId: value.medicineId,
        });

      const commercialPresentationFound = commercialPresentation.filter(
        (commercialPresentation: any) =>
          commercialPresentation.name.includes(value.concentration) &&
          commercialPresentation.package.id === value.packageId &&
          commercialPresentation.presentation.id === value.presentationId,
      );

      if (commercialPresentationFound.length > 0) {
        delete value.medicineName;
        delete value.medicineId;

        const dataMedicinesActivePrinciples: CreateMedicinesActivePrincipleDto =
          {
            ...value,
            commercialPresentationId: commercialPresentationFound[0].id,
          };

        await this.medicinesActivePrinciplesService.create(
          dataMedicinesActivePrinciples,
        );
      }
    }
  }

  async registerEntranceOfMedicines(medicines: any) {
    try {
      return Promise.all(
        medicines.map(async (data: any) => {
          const {
            medicine,
            concentration,
            boxesQuantity,
            unitQuantity,
            expiration,
            expire,
            donor,
            packageData,
            presentation,
          } = data;

          const medicineFound = await this.medicinesService.findByName(
            medicine,
          );

          const commercialPresentation =
            await this.commercialPresentationsService.findAll({
              medicineId: medicineFound.id,
            });

          const commercialPresentationFound = commercialPresentation.filter(
            (commercialPresentation: any) =>
              commercialPresentation.name.includes(concentration) &&
              commercialPresentation.presentation.name === presentation &&
              commercialPresentation.package.name === packageData,
          )[0];

          if (commercialPresentationFound) {
            const dataEntranceOfMedicines: CreateEntranceOfMedicineDto = {
              commercialPresentationId: commercialPresentationFound.id,
              boxesQuantity,
              unitQuantity,
              expiration,
              expire,
              donor,
            };

            return await this.entranceOfMedicinesService.create(
              dataEntranceOfMedicines,
            );
          }
        }),
      );
    } catch (error) {
      return error;
    }
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

  async loadPatients(data: Express.Multer.File, sheet: string) {
    try {
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(data.buffer);

      const worksheet = workbook.getWorksheet(sheet);

      const codeColArray = worksheet.getColumn(2).values;

      const lastNameColArray = worksheet.getColumn(3).values;

      const nameColArray = worksheet.getColumn(4).values;

      const identificationNumberColArray = worksheet.getColumn(42).values;

      const newPatients: any = [];

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

          newPatients.push({
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

      const uniqueArray = this.removeDuplicates(newPatients, 'code');

      await this.registerPatient(uniqueArray);
    } catch (error: any) {
      Logger.error(error, AppService.name);

      throw new InternalServerErrorException();
    }
  }

  async registerPatient(patients: any) {
    Promise.all(
      patients.map(
        async (patient: {
          code: string;
          name: string;
          lastName: string;
          identificationNumber: string;
          note: string;
        }) => {
          const { code, name, lastName, identificationNumber, note } = patient;
          const patientFound = await this.patientsService.findByCode(code);

          if (!patientFound) {
            const data: CreatePatientDto = {
              name,
              lastName,
              code,
              identificationNumber,
              note,
            };

            await this.patientsService.create(data);
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

  transformArray = (inputArray: MedicineInfo[]): MedicineInfo[] => {
    const result: { [key: string]: MedicineInfo } = {};

    const keys = [];

    inputArray.forEach((item) => {
      const key2 = `${item.medicineId}-${item.activePrincipleId}-${item.packageId}-${item.presentationId}`;
      const key3 = `${item.medicineId}-${item.activePrincipleId}-${item.packageId}-${item.presentationId}-${item.concentration}`;

      if (!keys.find((element) => element === key3)) {
        keys.push(key3);
        if (!result[key2]) {
          result[key2] = { ...item };
          result[key2].concentration = item.concentration;
        } else {
          result[key2].concentration += ` ${item.concentration}`;
        }
      } else {
        result[key3] = { ...item };
        result[key3].concentration = item.concentration;
      }
    });

    const resultArray = Object.values(result);

    return this.removeDuplicatesMultipleV2(resultArray);
  };

  removeDuplicatesMultipleV2(originalArray: any[]) {
    const filteredData = originalArray.filter(
      (objeto, index, self) =>
        index ===
        self.findIndex((o) => {
          if (
            o.medicineId === objeto.medicineId &&
            o.packageId === objeto.packageId &&
            o.presentationId === objeto.presentationId
          ) {
            o.medicineName = `${o.medicineName} ${objeto.concentration}`;

            return true;
          }
        }),
    );

    return filteredData;
  }
}
