import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { CommercialPresentation } from '../commercial-presentations/entities/commercial-presentation.entity';
import { OutletOfMedicine } from './entities/outlet-of-medicine.entity';

@EventSubscriber()
export class OutletOfMedicineSubscriber
  implements EntitySubscriberInterface<OutletOfMedicine>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return OutletOfMedicine;
  }

  async beforeInsert(event: InsertEvent<OutletOfMedicine>) {
    const { commercialPresentation, unitQuantity } = event.entity;

    await event.manager
      .createQueryBuilder()
      .update(CommercialPresentation)
      .set({ stock: () => 'stock - :unitQuantity' })
      .setParameters({ unitQuantity: unitQuantity })
      .where('id = :id', { id: commercialPresentation.id })
      .execute();
  }
}
