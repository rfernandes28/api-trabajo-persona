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
import { Action, ActionOut, SheetPatient } from './dto/load.dto';
import { CommercialPresentationsService } from '../app/commercial-presentations/commercial-presentations.service';
import { CreateCommercialPresentationDto } from '../app/commercial-presentations/dto/create-commercial-presentation.dto';
import { EntranceOfMedicinesService } from '../app/entrance-of-medicines/entrance-of-medicines.service';
import { CreateEntranceOfMedicineDto } from '../app/entrance-of-medicines/dto/create-entrance-of-medicine.dto';
import { CreateUserDto } from '../app/users/dto/create-user.dto';
import { UsersService } from '../app/users/users.service';
import { CommunitiesService } from '../app/communities/communities.service';
import { CreateCommunityDto } from 'src/app/communities/dto/create-community.dto';
import { CreateOutletOfMedicineDto } from 'src/app/outlet-of-medicines/dto/create-outlet-of-medicine.dto';
import { OutletOfMedicinesService } from 'src/app/outlet-of-medicines/outlet-of-medicines.service';

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
    private usersService: UsersService,
    private communitiesService: CommunitiesService,
    private presentationsService: PresentationsService,
    private entranceOfMedicinesService: EntranceOfMedicinesService,
    private outletOfMedicinesService: OutletOfMedicinesService,
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

      const expireColArray = worksheet.getColumn(11).values;

      const donorColArray = worksheet.getColumn(13).values;

      const userColArray = worksheet.getColumn(14).values;

      const newMedicine: any = [];

      const newUser: any = [];

      const newActivePrinciples: any = [];

      const newPackage: any = [];

      const newPresentation: any = [];

      const newConcentration: any = [];

      const newEntranceOfMedicines: any = [];

      activePrincipleColArray.map(
        async (activePrinciple: any, index: number) => {
          let medicine = medicineColArray[index];
          let user = userColArray[index];
          let location = locationColArray[index];
          let packageData = packageColArray[index];
          let presentation = presentationColArray[index];
          let concentration = concentrationColArray[index];
          let boxesQuantity = boxesQuantityColArray[index];
          let unitQuantity = unitQuantityColArray[index];

          const expiration = expirationColArray[index];
          const expire = expireColArray[index];
          const donor = donorColArray[index];

          if (index !== 4) {
            if (typeof medicine === 'object') {
              const nameArray = medicine.richText;
              medicine = nameArray[0].text;
            }
            medicine = medicine ? medicine.trim() : 's/i';

            if (typeof user === 'object') {
              const userArray = user.richText;
              user = userArray[0].text;
            }

            user = user ? user.trim() : null;

            if (user) {
              newUser.push({ name: user.toUpperCase() });
            }

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

              newEntranceOfMedicines.push({
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
                user,
              });
            }
          }
        },
      );

      if (action === Action.CARGAR) {
        Logger.verbose('Accion de cargar');

        const uniqueMedicineArray = this.removeDuplicates(newMedicine, 'name');

        const uniqueUserArray = this.removeDuplicates(newUser, 'name');

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
          await this.registerUser(uniqueUserArray),
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
        await this.registerEntranceOfMedicines(newEntranceOfMedicines);
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

      console.log('medicineFound', medicineFound);
      console.log('activePrincipleFound', activePrincipleFound);
      console.log('packageFound', packageFound);
      console.log('presentationFound', presentationFound);

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
        await medicines.map(async (data: any) => {
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
            user,
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

          const userFound = await this.usersService.findByName(user);

          if (commercialPresentationFound) {
            const dataEntranceOfMedicines: CreateEntranceOfMedicineDto = {
              commercialPresentationId: commercialPresentationFound.id,
              boxesQuantity,
              unitQuantity,
              expiration,
              expire,
              donor,
              userId: userFound ? userFound.id : null,
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

  async registerUser(users: any) {
    try {
      return Promise.all(
        users.map(async (user: { name: string }) => {
          const { name } = user;

          const userFound = await this.usersService.findAll({ search: name });

          if (userFound.length === 0) {
            const data: CreateUserDto = {
              name,
            };

            return await this.usersService.create(data);
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

  async loadCommunities(data: Express.Multer.File, sheet: string) {
    try {
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(data.buffer);

      const worksheet = workbook.getWorksheet(sheet);
      const communityColArray = worksheet.getColumn(5).values;

      const newCommunities: any = [];
      communityColArray.map(async (name: any, index: number) => {
        if (index !== 1 && name !== 'COMUNIDAD') {
          newCommunities.push({ name });
        }
      });

      const uniqueArray = this.removeDuplicates(newCommunities, 'name');

      await this.registerCommunity(uniqueArray);
    } catch (error: any) {
      Logger.error(error, AppService.name);

      throw new InternalServerErrorException();
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

      const communityColArray = worksheet.getColumn(5).values;

      const contactPersonArray = worksheet.getColumn(7).values;

      const identificationNumberColArray = worksheet.getColumn(42).values;

      const newPatients: any = [];

      for (let index = 0; index < codeColArray.length; index++) {
        const code = codeColArray[index];

        let name = nameColArray[index];
        let note = '';
        const lastName = lastNameColArray[index];
        const identificationNumber = identificationNumberColArray[index];

        const community = communityColArray[index];

        let contactPerson = contactPersonArray[index];

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

          if (typeof contactPerson === 'object') {
            const contactPersonArray = contactPerson.richText;
            contactPerson = contactPersonArray[0].text;
          }

          const communityFound = await this.communitiesService.findByName(
            community,
          );

          newPatients.push({
            code,
            name,
            lastName: lastName ? lastName.trim() : 's/i',
            identificationNumber: identificationNumber
              ? identificationNumber.toString().replace(/[^0-9]+/g, '')
              : '',
            note,
            communityId: communityFound ? communityFound.id : null,
            contactPerson,
          });
        }
      }

      const uniqueArray = this.removeDuplicates(newPatients, 'code');

      await this.registerPatient(uniqueArray);
    } catch (error: any) {
      Logger.error(error, AppService.name);

      throw new InternalServerErrorException();
    }
  }

  async loadMedicinesFromTreatments(
    data: Express.Multer.File,
    sheet: string,
    action: ActionOut,
  ) {
    try {
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(data.buffer);

      const worksheet = workbook.getWorksheet(sheet);

      const codeColArray = worksheet.getColumn(2).values;
      const medicineColArray = worksheet.getColumn(8).values;

      const activePrincipleColArray = worksheet.getColumn(9).values;

      let presentationColArray = worksheet.getColumn(10).values;

      let concentrationColArray = worksheet.getColumn(11).values;

      let ene22ColArray = worksheet.getColumn(15).values;
      let feb22ColArray = worksheet.getColumn(16).values;
      let mar22ColArray = worksheet.getColumn(17).values;
      let abr22ColArray = worksheet.getColumn(18).values;
      let may22ColArray = worksheet.getColumn(19).values;
      let jun22ColArray = worksheet.getColumn(20).values;
      let jul22ColArray = worksheet.getColumn(21).values;
      let ago22ColArray = worksheet.getColumn(22).values;
      let sep22ColArray = worksheet.getColumn(23).values;
      let oct22ColArray = worksheet.getColumn(24).values;
      let nov22ColArray = worksheet.getColumn(25).values;
      let dic22ColArray = worksheet.getColumn(26).values;
      let ene23ColArray = worksheet.getColumn(27).values;
      let feb23ColArray = worksheet.getColumn(28).values;
      let mar23ColArray = worksheet.getColumn(29).values;
      let abr23ColArray = worksheet.getColumn(30).values;
      let may23ColArray = worksheet.getColumn(31).values;
      let jun23ColArray = worksheet.getColumn(32).values;
      let jul23ColArray = worksheet.getColumn(33).values;
      let ago23ColArray = worksheet.getColumn(34).values;
      let sep23ColArray = worksheet.getColumn(35).values;
      let otc23ColArray = worksheet.getColumn(35).values;
      let nov23ColArray = worksheet.getColumn(37).values;

      if (sheet === SheetPatient.CCS_0322) {
        presentationColArray = worksheet.getColumn(11).values;
        concentrationColArray = worksheet.getColumn(12).values;
        ene22ColArray = worksheet.getColumn(14).values;
        feb22ColArray = worksheet.getColumn(15).values;
        mar22ColArray = worksheet.getColumn(16).values;
        abr22ColArray = worksheet.getColumn(17).values;
        may22ColArray = worksheet.getColumn(18).values;
        jun22ColArray = worksheet.getColumn(19).values;
        jul22ColArray = worksheet.getColumn(20).values;
        ago22ColArray = worksheet.getColumn(21).values;
        sep22ColArray = worksheet.getColumn(22).values;
        oct22ColArray = worksheet.getColumn(23).values;
        nov22ColArray = worksheet.getColumn(24).values;
        dic22ColArray = worksheet.getColumn(25).values;
        ene23ColArray = worksheet.getColumn(26).values;
        feb23ColArray = worksheet.getColumn(27).values;
        mar23ColArray = worksheet.getColumn(28).values;
        abr23ColArray = worksheet.getColumn(29).values;
        may23ColArray = worksheet.getColumn(30).values;
        jun23ColArray = worksheet.getColumn(31).values;
        jul23ColArray = worksheet.getColumn(32).values;
        ago23ColArray = worksheet.getColumn(33).values;
        sep23ColArray = worksheet.getColumn(34).values;
        otc23ColArray = worksheet.getColumn(35).values;
        nov23ColArray = worksheet.getColumn(36).values;
      }

      const newMedicine: any = [];

      const newActivePrinciples: any = [];

      const newPresentation: any = [];

      const newPackage: any = [];

      const newConcentration: any = [];

      const newOutletOfMedicines: any = [];

      for (let index = 0; index < medicineColArray.length; index++) {
        let medicine = medicineColArray[index];
        let activePrinciple = activePrincipleColArray[index];
        let presentation = presentationColArray[index];
        let concentration = concentrationColArray[index];
        const codeCol = codeColArray[index];

        let ene22Col = ene22ColArray[index];
        let feb22Col = feb22ColArray[index];
        let mar22Col = mar22ColArray[index];
        let abr22Col = abr22ColArray[index];
        let may22Col = may22ColArray[index];
        let jun22Col = jun22ColArray[index];
        let jul22Col = jul22ColArray[index];
        let ago22Col = ago22ColArray[index];
        let sep22Col = sep22ColArray[index];
        let oct22Col = oct22ColArray[index];
        let nov22Col = nov22ColArray[index];
        let dic22Col = dic22ColArray[index];
        let ene23Col = ene23ColArray[index];
        let feb23Col = feb23ColArray[index];
        let mar23Col = mar23ColArray[index];
        let abr23Col = abr23ColArray[index];
        let may23Col = may23ColArray[index];
        let jun23Col = jun23ColArray[index];
        let jul23Col = jul23ColArray[index];
        let ago23Col = ago23ColArray[index];
        let sep23Col = sep23ColArray[index];
        let otc23Col = otc23ColArray[index];
        let nov23Col = nov23ColArray[index];

        // const feb22Col = feb22ColArray[index];

        // console.log('feb22Col::', feb22Col, '>>', index);

        if (index > 1) {
          if (typeof medicine === 'object') {
            const nameArray = medicine.richText;
            medicine = nameArray[0].text;
          }
          medicine = medicine ? medicine.trim() : 's/i';

          newMedicine.push({
            name: medicine.toUpperCase(),
            location: 'S/I',
          });

          newPackage.push({
            name: 'S/I',
          });

          if (typeof activePrinciple === 'object') {
            const nameArray = activePrinciple.richText;
            activePrinciple = nameArray[0].text;
          }

          activePrinciple = activePrinciple ? activePrinciple.trim() : 's/i';

          if (typeof presentation === 'object') {
            const nameArray = presentation.richText;
            presentation = nameArray[0].text;
          }
          presentation = presentation ? presentation.trim() : 's/i';
          newPresentation.push({ name: presentation.toUpperCase() });

          if (typeof concentration === 'object') {
            const nameArray = concentration.richText;
            concentration = nameArray[0].text;
          }

          if (typeof concentration === 'number') {
            concentration = `${concentration} mg`;
          }

          concentration = concentration ? concentration.trim() : 's/i';
          newConcentration.push({ name: concentration.toUpperCase() });

          if (action === ActionOut.CARGAR) {
            activePrinciple.split('/').map((value: string) => {
              value = value.replace(/\s+/g, ' ');

              newActivePrinciples.push({
                name: value.trim().toUpperCase(),
              });
            });
          } else if (action === ActionOut.REGISTRAR) {
            activePrinciple = activePrinciple ? activePrinciple.trim() : 's/i';
            newActivePrinciples.push({
              name: activePrinciple.toUpperCase(),
            });
          } else if (action === ActionOut.SALIDAS) {
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            // ----
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }
            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }

            if (typeof ene22Col === 'object') {
              ene22Col = ene22Col.result;
            }

            if (ene22Col && codeCol) {
              newOutletOfMedicines.push({
                medicine: medicine.toUpperCase(),
                concentration,
                activePrinciple: activePrinciple
                  ? activePrinciple.trim()
                  : 'S/I',
                unitQuantity: ene22Col,
                presentation: presentation.toUpperCase(),
                patient: codeCol,
                date: ene22ColArray[1],
              });
            }
          }
        }
      }

      if (action === ActionOut.CARGAR) {
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
          await this.registerPresentation(uniquePresentationArray),
          await this.registerPackage(uniquePackageArray),
        ]);
      } else if (action === ActionOut.REGISTRAR) {
        Logger.verbose('Accion de registro');

        await this.registerMedicineHasActivePrinciples(
          newMedicine,
          newActivePrinciples,
          newPackage,
          newPresentation,
          newConcentration,
        );
      } else if (action === ActionOut.SALIDAS) {
        Logger.verbose('Accion de registro de salidas de medicamentos');
        await this.registerOutletOfMedicines(newOutletOfMedicines);
      }
    } catch (error: any) {
      Logger.error(error, AppService.name);

      throw new InternalServerErrorException();
    }
  }

  async registerOutletOfMedicines(medicines: any) {
    try {
      return Promise.all(
        await medicines.map(async (data: any) => {
          const {
            medicine,
            concentration,
            unitQuantity,
            presentation,
            patient,
            date,
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
              commercialPresentation.name.includes(
                concentration.toUpperCase(),
              ) && commercialPresentation.presentation.name === presentation,
          )[0];

          const patientFound = await this.patientsService.findByCode(patient);
          if (commercialPresentationFound && patientFound) {
            const dataOutletOfMedicines: CreateOutletOfMedicineDto = {
              commercialPresentationId: commercialPresentationFound.id,
              unitQuantity,
              patientId: patientFound.id,
              createAt: date,
            };
            return await this.outletOfMedicinesService.create(
              dataOutletOfMedicines,
            );
          }
        }),
      );
    } catch (error) {
      console.log('error>>', error);

      return error;
    }
  }

  async registerCommunity(communities: any) {
    Promise.all(
      communities.map(async (community: { name: string }) => {
        const { name } = community;
        const communityFound = await this.communitiesService.findByName(name);

        if (!communityFound) {
          const data: CreateCommunityDto = {
            name,
          };

          await this.communitiesService.create(data);
        }
      }),
    );
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
          communityId: number;
          contactPerson: string;
        }) => {
          const {
            code,
            name,
            lastName,
            identificationNumber,
            note,
            communityId,
            contactPerson,
          } = patient;

          const patientFound = await this.patientsService.findByCode(code);

          if (!patientFound) {
            const data: CreatePatientDto = {
              name,
              lastName,
              code,
              identificationNumber,
              note,
              communityId,
              contactPerson,
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
