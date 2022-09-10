import { MigrationInterface, QueryRunner } from "typeorm";

export class Estoque1662833187907 implements MigrationInterface {
    name = 'Estoque1662833187907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(200) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accessLog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accessDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_2c29a0c4a68e599e9f476938bdd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying(70) NOT NULL, "zipCode" character varying(11) NOT NULL, "number" character varying(20) NOT NULL, "city" character varying(40) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productOrder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "quantityOfProducts" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "requestDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "productId" uuid, CONSTRAINT "PK_62d6c74feb56fe9253a9a43eb12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "cpf" character varying(15) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "contractDate" TIMESTAMP NOT NULL DEFAULT now(), "administrationNivel" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "occupation" character varying(30) NOT NULL, "telephone" character varying(15) NOT NULL, "cell" character varying(15) NOT NULL, "addressId" uuid, CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "outputProduct" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "descriptio" character varying(100) NOT NULL, "quantity" integer NOT NULL, "outputdate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "productId" uuid, CONSTRAINT "PK_4716d127fa5e51cb4a0804858dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "telephone" character varying(12) NOT NULL, "email" character varying(100) NOT NULL, "cnpj" character varying(16) NOT NULL, "address" character varying(200) NOT NULL, "employee" character varying(40) NOT NULL, "employeeCell" character varying(15) NOT NULL, CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(200) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "value" integer NOT NULL, "saleValue" integer NOT NULL, "stock" integer NOT NULL, "criticalStock" integer NOT NULL, "providerId" uuid, "categoryId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productEntry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "receivedD" date NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "userId" uuid, "productId" uuid, "providerId" uuid, CONSTRAINT "PK_2aac59694b296c060b446cb1a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accessLog" ADD CONSTRAINT "FK_6ce73cd458f0df2a052f331c57c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productOrder" ADD CONSTRAINT "FK_b7fdc6bd92a804c7fa696856f77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productOrder" ADD CONSTRAINT "FK_6eef5bbf67ba6262f5ace7f67cc" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "outputProduct" ADD CONSTRAINT "FK_6c3b571abc59228dd9025272b88" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "outputProduct" ADD CONSTRAINT "FK_04c40307b48df0c18f81bc82f66" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productEntry" ADD CONSTRAINT "FK_124a7ba9b362bfe04cc05b20363" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productEntry" ADD CONSTRAINT "FK_e0f4c59c9321c0921eff703f4cd" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productEntry" ADD CONSTRAINT "FK_8611f50f932d4dc0e4e917035e7" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productEntry" DROP CONSTRAINT "FK_8611f50f932d4dc0e4e917035e7"`);
        await queryRunner.query(`ALTER TABLE "productEntry" DROP CONSTRAINT "FK_e0f4c59c9321c0921eff703f4cd"`);
        await queryRunner.query(`ALTER TABLE "productEntry" DROP CONSTRAINT "FK_124a7ba9b362bfe04cc05b20363"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0"`);
        await queryRunner.query(`ALTER TABLE "outputProduct" DROP CONSTRAINT "FK_04c40307b48df0c18f81bc82f66"`);
        await queryRunner.query(`ALTER TABLE "outputProduct" DROP CONSTRAINT "FK_6c3b571abc59228dd9025272b88"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "productOrder" DROP CONSTRAINT "FK_6eef5bbf67ba6262f5ace7f67cc"`);
        await queryRunner.query(`ALTER TABLE "productOrder" DROP CONSTRAINT "FK_b7fdc6bd92a804c7fa696856f77"`);
        await queryRunner.query(`ALTER TABLE "accessLog" DROP CONSTRAINT "FK_6ce73cd458f0df2a052f331c57c"`);
        await queryRunner.query(`DROP TABLE "productEntry"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "outputProduct"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "productOrder"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "accessLog"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
