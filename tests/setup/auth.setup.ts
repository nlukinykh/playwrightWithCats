import { test as setup } from "@playwright/test";
import { authFile } from "../fixtures/app.fixture";
import { testUsers } from "../pom/data/testData";
import { AuthModal } from "../pom/pages/AuthModal";
import { HomePage } from "../pom/pages/HomePage";

setup("Authenticate existing user", async ({ page }) => {
  const homePage = new HomePage(page);
  const authModal = new AuthModal(page);

  await homePage.open();
  await authModal.signIn(testUsers.existing.email, testUsers.existing.password);
  await authModal.assertSignedIn();
  await page.context().storageState({ path: authFile });
});
