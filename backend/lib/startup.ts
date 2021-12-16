import { gimme_dat_local_db_uri } from "./server/db-local";
import { is_local_dev, is_test } from "./constants";

const init_db = async () => {
  if (is_test || is_local_dev) {
    await gimme_dat_local_db_uri();
  }
};

const init = async () => {
  await init_db();
  await import("./server/index");
};

init();
