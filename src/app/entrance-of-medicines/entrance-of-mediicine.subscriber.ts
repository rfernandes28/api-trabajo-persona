import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { EntranceOfMedicine } from './entities/entrance-of-medicine.entity';
import { CommercialPresentation } from '../commercial-presentations/entities/commercial-presentation.entity';

@EventSubscriber()
export class EntranceOfMedicineSubscriber
  implements EntitySubscriberInterface<EntranceOfMedicine>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return EntranceOfMedicine;
  }

  async beforeInsert(event: InsertEvent<EntranceOfMedicine>) {
    const { commercialPresentation, unitQuantity } = event.entity;

    await event.manager
      .createQueryBuilder()
      .update(CommercialPresentation)
      .set({ stock: () => 'stock + :unitQuantity' })
      .setParameters({ unitQuantity: unitQuantity })
      .where('id = :id', { id: commercialPresentation.id })
      .execute();
  }
}
