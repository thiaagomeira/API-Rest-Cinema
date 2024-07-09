import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTicket1648573956817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ticket',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'chair',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'int',
          },
          {
            name: 'session_id',
            type: 'integer',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ticket',
      new TableForeignKey({
        columnNames: ['session_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'session',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('ticket');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('session_id') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('ticket', foreignKey);
      }
      await queryRunner.dropTable('ticket');
    }
  }
}
