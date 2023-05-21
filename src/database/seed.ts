import * as glob from "glob";
import { appDataSource } from "./typeorm-migration.config";
import { join } from "path";

async function runSeed() {
  try {
    const connection = await appDataSource.initialize();

    const dirArg = process.argv[2];
    // Загрузка всех сидеров
    const seederFiles = glob.sync(join(process.cwd(), ...dirArg.split('/')));
    const seeders = seederFiles.map((file) => require(file).default);

    // Запуск каждого сидера
    for (const SeederClass of seeders) {
      const seeder = new SeederClass();
      await seeder.run(connection);
    }

    await connection.destroy(); // Закрытие подключения к базе данных
    console.log("Seed executed successfully!");
  } catch (error) {
    console.error("Error executing seed:", error);
  }
}

runSeed();