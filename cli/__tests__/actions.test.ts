jest.mock("node-fetch");
import fetch from "node-fetch";
import { getCommand } from "../lib/actions";
import { tmpDir } from "../lib/helpers/archive";
process.env.CWD_OVERRIDE = tmpDir;

describe("actions", () => {
  describe("getCommand", () => {
    it("fetches the correct package and version", async () => {
      await getCommand("test", "1.0.0");
      const values = (fetch as any).getConfig();
      expect(
        values["https://blobs.dcpm.dev/api/blob/get/test/1.0.0.zip"]
      ).toBeTruthy();
    });
  });
});
