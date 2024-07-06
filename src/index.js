import app from './app.js';
import 'dotenv/config';
import logger from './logs/logger.js';
import { sequelize } from './database/database.js';

async function main() {
  await sequelize.sync({ force: false });
  const port = process.env.PORT ?? 3000;
  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

main();