import { expect, test } from '@playwright/test'

test.describe('Header Component E2E', () => {
  test('로그인 버튼 클릭 시 /login으로 이동', async ({ page }) => {
    await page.goto('/home')

    const btn = page.getByRole('button', { name: /로그인/ })
    await btn.click()

    await expect(page).toHaveURL(/\/login$/)
  })
})
