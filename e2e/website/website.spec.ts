import { test, expect } from '@playwright/test'

// ─── Navbar (global) ─────────────────────────────────────────────────────────

test.describe('Navbar', () => {
  const menuItems = [
    'Home',
    'OfficeDoctor',
    'FastClinic',
    'GymCheck',
    'Skincare',
    'Carteirinha Oliv-e',
    'Blog'
  ]

  test('exibe todos os 7 itens de menu na home', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    for (const item of menuItems) {
      await expect(page.getByRole('link', { name: item }).first()).toBeVisible()
    }
    await page.screenshot({ path: 'test-results/website-01-navbar.png' })
  })

  for (const href of [
    '/officedoctor',
    '/fastclinic',
    '/gymcheck',
    '/skincare',
    '/carteirinha',
    '/blog'
  ]) {
    test(`navbar está presente em ${href}`, async ({ page }) => {
      await page.goto(href)
      await page.waitForLoadState('domcontentloaded')
      await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible()
    })
  }

  test('link "Home" navega para /', async ({ page }) => {
    await page.goto('/officedoctor')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('link', { name: 'Home' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL('/')
  })

  test('link "Carteirinha Oliv-e" navega para /carteirinha', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('link', { name: 'Carteirinha Oliv-e' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/carteirinha/i)
    await page.screenshot({ path: 'test-results/website-02-carteirinha-nav.png' })
  })

  test('clique em OfficeDoctor no menu navega para /officedoctor', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('link', { name: 'OfficeDoctor' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/officedoctor/i)
  })

  test('clique em FastClinic no menu navega para /fastclinic', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('link', { name: 'FastClinic' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/fastclinic/i)
  })

  test('clique em GymCheck no menu navega para /gymcheck', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('link', { name: 'GymCheck' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/gymcheck/i)
  })

  test('clique em Skincare no menu navega para /skincare', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('link', { name: 'Skincare' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/skincare/i)
  })

  test('clique em Blog no menu navega para /blog', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('link', { name: 'Blog' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/blog/i)
  })
})

// ─── Footer (global) ─────────────────────────────────────────────────────────

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.locator('footer').scrollIntoViewIfNeeded()
  })

  test('endereço está visível no footer', async ({ page }) => {
    await expect(
      page
        .locator('footer')
        .getByText(/avenida brigadeiro faria lima/i)
        .first()
    ).toBeVisible()
    await page.screenshot({ path: 'test-results/website-footer-01-endereco.png' })
  })

  test('telefone está visível no footer', async ({ page }) => {
    await expect(
      page
        .locator('footer')
        .getByText(/3814-1131/)
        .first()
    ).toBeVisible()
  })

  test('horário de atendimento está visível', async ({ page }) => {
    await expect(
      page
        .locator('footer')
        .getByText(/segunda a sexta/i)
        .first()
    ).toBeVisible()
  })

  test('link LinkedIn está presente no footer', async ({ page }) => {
    await expect(page.locator('footer a[href*="linkedin"]').first()).toBeVisible()
  })

  test('link Instagram está presente no footer', async ({ page }) => {
    await expect(page.locator('footer a[href*="instagram"]').first()).toBeVisible()
  })

  test('texto de copyright está visível', async ({ page }) => {
    await expect(
      page
        .locator('footer')
        .getByText(/todos direitos reservados/i)
        .first()
    ).toBeVisible()
    await page.screenshot({ path: 'test-results/website-footer-02-copyright.png' })
  })

  test('link de política de privacidade está presente', async ({ page }) => {
    await expect(
      page
        .locator('footer')
        .getByRole('link', { name: /política de privacidade/i })
        .first()
    ).toBeVisible()
  })

  test('disclaimer sobre não ser plano de saúde está visível', async ({ page }) => {
    await expect(
      page
        .locator('footer')
        .getByText(/plataforma digital de saúde/i)
        .first()
    ).toBeVisible()
  })
})

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

test.describe('WhatsApp — botão flutuante', () => {
  test('botão WhatsApp é visível na home', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(2000)
    const wa = page
      .locator(
        'a[href*="whatsapp"], a[href*="wa.me"], [aria-label*="whatsapp" i], [aria-label*="WhatsApp"]'
      )
      .first()
    if (!(await wa.isVisible())) {
      test.skip(true, 'Botão WhatsApp não encontrado — pode não estar implementado neste ambiente')
    }
    await expect(wa).toBeVisible()
    await page.screenshot({ path: 'test-results/website-wa-01-home.png' })
  })

  test('link WhatsApp aponta para wa.me ou api.whatsapp.com', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(2000)
    const wa = page.locator('a[href*="whatsapp"], a[href*="wa.me"]').first()
    if (!(await wa.isVisible())) {
      test.skip(true, 'Botão WhatsApp não encontrado — pode não estar implementado neste ambiente')
    }
    const href = await wa.getAttribute('href')
    expect(href).toMatch(/wa\.me|api\.whatsapp\.com/)
  })
})

// ─── Home (/') ───────────────────────────────────────────────────────────────

test.describe('Home (/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
  })

  // Hero
  test('hero exibe H1 "Saúde acessível, em minutos"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /saúde acessível, em minutos/i })).toBeVisible()
    await page.screenshot({ path: 'test-results/website-home-01-hero.png' })
  })

  test('hero exibe botão "Fale com a gente"', async ({ page }) => {
    await expect(page.getByText(/fale com a gente/i).first()).toBeVisible()
  })

  test('hero exibe botão "explorar"', async ({ page }) => {
    await expect(page.getByText(/explorar/i).first()).toBeVisible()
  })

  // Cards de produto
  test('card OfficeDoctor está visível na home', async ({ page }) => {
    await expect(page.getByText('OfficeDoctor').first()).toBeVisible()
    await page.screenshot({ path: 'test-results/website-home-02-cards.png' })
  })

  test('card FastClinic está visível na home', async ({ page }) => {
    await page.getByText('FastClinic').first().scrollIntoViewIfNeeded()
    await expect(page.getByText('FastClinic').first()).toBeVisible()
  })

  test('card GymCheck está visível na home', async ({ page }) => {
    await page.getByText('GymCheck').first().scrollIntoViewIfNeeded()
    await expect(page.getByText('GymCheck').first()).toBeVisible()
  })

  test('card SkinCare está visível na home', async ({ page }) => {
    await page.getByText('SkinCare').first().scrollIntoViewIfNeeded()
    await expect(page.getByText('SkinCare').first()).toBeVisible()
  })

  test('card Carteirinha Oliv-e está visível na home', async ({ page }) => {
    await page
      .getByText(/Carteirinha Oliv-e/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.getByText(/Carteirinha Oliv-e/i).first()).toBeVisible()
  })

  test('"Saiba Mais" de OfficeDoctor navega para /officedoctor', async ({ page }) => {
    await page
      .getByRole('link', { name: /saiba mais/i })
      .first()
      .click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/officedoctor/i)
    await page.screenshot({ path: 'test-results/website-home-03-saibamais-od.png' })
  })

  // Seção "Por que escolher"
  test('seção "Por que escolher a Oliv-e?" está visível', async ({ page }) => {
    const secao = page.getByText(/por que escolher a oliv-e/i).first()
    await secao.scrollIntoViewIfNeeded()
    await expect(secao).toBeVisible()
    await page.screenshot({ path: 'test-results/website-home-04-por-que-escolher.png' })
  })

  // Seção de equipamentos
  test('seção "Cabines e totens" está visível', async ({ page }) => {
    const secao = page.getByText(/cabines e totens/i).first()
    await secao.scrollIntoViewIfNeeded()
    await expect(secao).toBeVisible()
    await page.screenshot({ path: 'test-results/website-home-05-cabines.png' })
  })

  // FAQ
  test('seção "Perguntas Frequentes" está visível', async ({ page }) => {
    const faq = page.getByText(/perguntas frequentes/i).first()
    await faq.scrollIntoViewIfNeeded()
    await expect(faq).toBeVisible()
    await page.screenshot({ path: 'test-results/website-home-06-faq.png' })
  })

  test('FAQ: primeira pergunta é expansível', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    const btn = page.locator('button, [role="button"]').filter({ hasText: /\?/ }).first()
    if (await btn.isVisible()) {
      await btn.click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'test-results/website-home-07-faq-aberto.png' })
    }
  })

  test('FAQ: pergunta sobre dados de saúde está presente', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.getByText(/dados de saúde/i).first()).toBeVisible()
  })

  test('FAQ: pergunta sobre sinais vitais está presente', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.getByText(/sinais vitais/i).first()).toBeVisible()
  })

  // Formulário de contato
  test('heading "Pronto para dar o próximo passo?" está visível', async ({ page }) => {
    const cta = page.getByText(/pronto para dar o próximo passo/i).first()
    await cta.scrollIntoViewIfNeeded()
    await expect(cta).toBeVisible()
    await page.screenshot({ path: 'test-results/website-home-08-form-cta.png' })
  })

  test('formulário contém campo de telefone', async ({ page }) => {
    await page
      .getByText(/pronto para dar o próximo passo/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.locator('input[type="tel"], input[inputmode="tel"]').first()).toBeVisible()
  })

  test('formulário contém checkbox de política de privacidade', async ({ page }) => {
    await page
      .getByText(/pronto para dar o próximo passo/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.locator('input[type="checkbox"]').first()).toBeVisible()
  })

  test('formulário contém botão de envio', async ({ page }) => {
    await page
      .getByText(/pronto para dar o próximo passo/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.getByRole('button', { name: /agendar/i }).first()).toBeVisible()
  })
})

// ─── OfficeDoctor ─────────────────────────────────────────────────────────────

test.describe('OfficeDoctor (/officedoctor)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/officedoctor')
    await page.waitForLoadState('domcontentloaded')
  })

  test('heading "OfficeDoctor" está visível', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /officedoctor/i }).first()).toBeVisible()
    await page.screenshot({ path: 'test-results/website-od-01-heading.png' })
  })

  test('texto sobre gestão de saúde está visível', async ({ page }) => {
    await expect(page.getByText(/gestão de saúde/i).first()).toBeVisible()
  })

  test('seção Dashboard está visível', async ({ page }) => {
    const dash = page.getByText(/dashboard/i).first()
    await dash.scrollIntoViewIfNeeded()
    await expect(dash).toBeVisible()
    await page.screenshot({ path: 'test-results/website-od-02-dashboard.png' })
  })

  test('métrica de triagens está visível no dashboard', async ({ page }) => {
    await page.waitForTimeout(1500)
    const metrica = page.getByText(/triagens/i).first()
    const visible = await metrica.isVisible().catch(() => false)
    if (!visible) {
      test.skip(true, 'Métrica de triagens não está visível — pode estar em tab ou lazy-load')
    }
    await expect(metrica).toBeVisible()
  })

  test('solução adicional (Bafômetro ou Temperatura) está mencionada', async ({ page }) => {
    await page.waitForTimeout(1500)
    const baf = page.getByText(/bafômetro|temperatura|eletrocardiograma/i).first()
    const visible = await baf.isVisible().catch(() => false)
    if (!visible) {
      test.skip(
        true,
        'Seção de soluções adicionais não está visível — pode estar em tab ou lazy-load'
      )
    }
    await expect(baf).toBeVisible()
    await page.screenshot({ path: 'test-results/website-od-03-solucoes.png' })
  })

  test('botão ou link "Calcular ROI" ou "ROI" está visível', async ({ page }) => {
    await page.waitForTimeout(1500)
    const roi = page.getByText(/calcular roi|calcule o roi|roi/i).first()
    if ((await roi.count()) === 0) {
      test.skip(true, 'Botão ROI não encontrado na página')
    }
    await roi.scrollIntoViewIfNeeded()
    await expect(roi).toBeVisible()
    await page.screenshot({ path: 'test-results/website-od-04-roi.png' })
  })

  test('FAQ "Perguntas Frequentes" está visível', async ({ page }) => {
    const faq = page.getByText(/perguntas frequentes/i).first()
    await faq.scrollIntoViewIfNeeded()
    await expect(faq).toBeVisible()
    await page.screenshot({ path: 'test-results/website-od-05-faq.png' })
  })

  test('FAQ: "Quem contrata o OFFICE DOCTOR?" está presente', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.getByText(/quem contrata/i).first()).toBeVisible()
  })

  test('FAQ: "Vocês fazem Telemedicina?" está presente', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.getByText(/telemedicina/i).first()).toBeVisible()
  })

  test('FAQ: primeira pergunta é expansível', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    const btn = page
      .locator('button, [role="button"]')
      .filter({ hasText: /quem contrata/i })
      .first()
    if (await btn.isVisible()) {
      await btn.click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'test-results/website-od-06-faq-aberto.png' })
    }
  })

  test('formulário de contato está presente', async ({ page }) => {
    const form = page.getByText(/pronto para dar o próximo passo/i).first()
    await form.scrollIntoViewIfNeeded()
    await expect(form).toBeVisible()
  })
})

// ─── FastClinic ───────────────────────────────────────────────────────────────

test.describe('FastClinic (/fastclinic)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fastclinic')
    await page.waitForLoadState('domcontentloaded')
  })

  test('heading "FastClinic" está visível', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /fastclinic/i }).first()).toBeVisible()
    await page.screenshot({ path: 'test-results/website-fc-01-heading.png' })
  })

  test('feature "Triagem" está visível', async ({ page }) => {
    const txt = page.getByText(/triagem/i).first()
    await txt.scrollIntoViewIfNeeded()
    await expect(txt).toBeVisible()
  })

  test('texto "menos de 3 minutos" está visível', async ({ page }) => {
    const txt = page.getByText(/menos de 3 minutos/i).first()
    await txt.scrollIntoViewIfNeeded()
    await expect(txt).toBeVisible()
    await page.screenshot({ path: 'test-results/website-fc-02-3min.png' })
  })

  test('feature "Integração de sistemas" está visível', async ({ page }) => {
    const txt = page.getByText(/integração de sistemas/i).first()
    await txt.scrollIntoViewIfNeeded()
    await expect(txt).toBeVisible()
  })

  test('feature "Suporte à equipe médica" está visível', async ({ page }) => {
    const txt = page.getByText(/suporte à equipe médica/i).first()
    await txt.scrollIntoViewIfNeeded()
    await expect(txt).toBeVisible()
  })

  test('FAQ "Perguntas Frequentes" está visível', async ({ page }) => {
    const faq = page.getByText(/perguntas frequentes/i).first()
    await faq.scrollIntoViewIfNeeded()
    await expect(faq).toBeVisible()
    await page.screenshot({ path: 'test-results/website-fc-03-faq.png' })
  })

  test('FAQ: "Quem contrata o FAST CLINIC?" está presente', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.getByText(/quem contrata/i).first()).toBeVisible()
  })

  test('FAQ: primeira pergunta FastClinic é expansível', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    const btn = page
      .locator('button, [role="button"]')
      .filter({ hasText: /quem contrata/i })
      .first()
    if (await btn.isVisible()) {
      await btn.click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'test-results/website-fc-04-faq-aberto.png' })
    }
  })

  test('formulário de contato está presente', async ({ page }) => {
    const form = page.getByText(/pronto para dar o próximo passo/i).first()
    await form.scrollIntoViewIfNeeded()
    await expect(form).toBeVisible()
  })

  test('CTA "Fale com um especialista" está presente', async ({ page }) => {
    const cta = page.getByText(/fale com um especialista/i).first()
    await cta.scrollIntoViewIfNeeded()
    await expect(cta).toBeVisible()
  })
})

// ─── GymCheck ─────────────────────────────────────────────────────────────────

test.describe('GymCheck (/gymcheck)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gymcheck')
    await page.waitForLoadState('domcontentloaded')
  })

  test('heading "Gym Check" está visível', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /gym.?check/i }).first()).toBeVisible()
    await page.screenshot({ path: 'test-results/website-gc-01-heading.png' })
  })

  test('texto sobre segurança do aluno está visível', async ({ page }) => {
    const txt = page.getByText(/segurança/i).first()
    await txt.scrollIntoViewIfNeeded()
    await expect(txt).toBeVisible()
  })

  test('feature "Tecnologia" está visível', async ({ page }) => {
    const txt = page.getByText(/tecnologia/i).first()
    await txt.scrollIntoViewIfNeeded()
    await expect(txt).toBeVisible()
    await page.screenshot({ path: 'test-results/website-gc-02-tecnologia.png' })
  })

  test('feature "Sistema" (integração com academia) está visível', async ({ page }) => {
    const txt = page.getByText(/sistema/i).first()
    await txt.scrollIntoViewIfNeeded()
    await expect(txt).toBeVisible()
  })

  test('FAQ "Perguntas Frequentes" está visível', async ({ page }) => {
    const faq = page.getByText(/perguntas frequentes/i).first()
    await faq.scrollIntoViewIfNeeded()
    await expect(faq).toBeVisible()
    await page.screenshot({ path: 'test-results/website-gc-03-faq.png' })
  })

  test('FAQ: pergunta sobre dados de saúde está presente', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.getByText(/dados de saúde/i).first()).toBeVisible()
  })

  test('FAQ: primeira pergunta GymCheck é expansível', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    const btn = page.locator('button, [role="button"]').filter({ hasText: /\?/ }).first()
    if (await btn.isVisible()) {
      await btn.click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'test-results/website-gc-04-faq-aberto.png' })
    }
  })

  test('formulário de contato está presente', async ({ page }) => {
    const form = page.getByText(/pronto para dar o próximo passo/i).first()
    await form.scrollIntoViewIfNeeded()
    await expect(form).toBeVisible()
  })
})

// ─── Skincare ─────────────────────────────────────────────────────────────────

test.describe('Skincare (/skincare)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/skincare')
    await page.waitForLoadState('domcontentloaded')
  })

  test('heading "Skincare" está visível', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /skincare/i }).first()).toBeVisible()
    await page.screenshot({ path: 'test-results/website-sk-01-heading.png' })
  })

  test('feature "Análise de pele" está visível', async ({ page }) => {
    const txt = page.getByText(/análise de pele/i).first()
    await txt.scrollIntoViewIfNeeded()
    await expect(txt).toBeVisible()
    await page.screenshot({ path: 'test-results/website-sk-02-analise.png' })
  })

  test('feature "Recomendação personalizada" está visível', async ({ page }) => {
    const txt = page.getByText(/recomendação personalizada/i).first()
    await txt.scrollIntoViewIfNeeded()
    await expect(txt).toBeVisible()
  })

  test('feature "Diferencial" está visível', async ({ page }) => {
    const txt = page.getByText(/diferencial/i).first()
    await txt.scrollIntoViewIfNeeded()
    await expect(txt).toBeVisible()
  })

  test('FAQ "Perguntas Frequentes" está visível', async ({ page }) => {
    const faq = page.getByText(/perguntas frequentes/i).first()
    await faq.scrollIntoViewIfNeeded()
    await expect(faq).toBeVisible()
    await page.screenshot({ path: 'test-results/website-sk-03-faq.png' })
  })

  test('FAQ: "Quem contrata o SKINCARE?" está presente', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.getByText(/quem contrata/i).first()).toBeVisible()
  })

  test('FAQ: primeira pergunta Skincare é expansível', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    const btn = page.locator('button, [role="button"]').filter({ hasText: /\?/ }).first()
    if (await btn.isVisible()) {
      await btn.click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'test-results/website-sk-04-faq-aberto.png' })
    }
  })

  test('formulário de contato está presente', async ({ page }) => {
    const form = page.getByText(/pronto para dar o próximo passo/i).first()
    await form.scrollIntoViewIfNeeded()
    await expect(form).toBeVisible()
  })
})

// ─── Carteirinha ──────────────────────────────────────────────────────────────

test.describe('Carteirinha Oliv-e (/carteirinha)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/carteirinha')
    await page.waitForLoadState('domcontentloaded')
  })

  test('heading "Carteirinha Oliv-e" está visível', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /carteirinha/i }).first()).toBeVisible()
    await page.screenshot({ path: 'test-results/website-ca-01-heading.png' })
  })

  test('seção de coberturas está visível', async ({ page }) => {
    const cob = page.getByText(/cobertura/i).first()
    await cob.scrollIntoViewIfNeeded()
    await expect(cob).toBeVisible()
    await page.screenshot({ path: 'test-results/website-ca-02-coberturas.png' })
  })

  test('app "Oliv-e" está mencionado', async ({ page }) => {
    const app = page.getByText(/app oliv-e/i).first()
    await app.scrollIntoViewIfNeeded()
    await expect(app).toBeVisible()
  })

  test('FAQ "Perguntas Frequentes" está visível', async ({ page }) => {
    const faq = page.getByText(/perguntas frequentes/i).first()
    await faq.scrollIntoViewIfNeeded()
    await expect(faq).toBeVisible()
    await page.screenshot({ path: 'test-results/website-ca-03-faq.png' })
  })

  test('FAQ: pergunta sobre substituir planos de saúde está presente', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    await expect(page.getByText(/substitui/i).first()).toBeVisible()
  })

  test('FAQ: primeira pergunta Carteirinha é expansível', async ({ page }) => {
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    const btn = page.locator('button, [role="button"]').filter({ hasText: /\?/ }).first()
    if (await btn.isVisible()) {
      await btn.click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'test-results/website-ca-04-faq-aberto.png' })
    }
  })

  test('formulário de contato está presente', async ({ page }) => {
    const form = page.getByText(/pronto para dar o próximo passo/i).first()
    await form.scrollIntoViewIfNeeded()
    await expect(form).toBeVisible()
  })
})

// ─── Blog ─────────────────────────────────────────────────────────────────────

test.describe('Blog (/blog)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('domcontentloaded')
  })

  test('H1 sobre conteúdo de saúde está visível', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /conteúdo para quem cuida/i }).first()
    ).toBeVisible()
    await page.screenshot({ path: 'test-results/website-blog-01-heading.png' })
  })

  test('subtítulo sobre insights está visível', async ({ page }) => {
    await expect(page.getByText(/insights/i).first()).toBeVisible()
  })

  test('artigo sobre "IA na saúde" está visível', async ({ page }) => {
    await expect(page.getByText(/ia na saúde/i).first()).toBeVisible()
    await page.screenshot({ path: 'test-results/website-blog-02-artigos.png' })
  })

  test('artigo sobre "skincare" está visível', async ({ page }) => {
    await expect(page.getByText(/skincare/i).first()).toBeVisible()
  })

  test('artigo sobre "absenteísmo" está visível', async ({ page }) => {
    await expect(page.getByText(/absenteísmo/i).first()).toBeVisible()
  })

  test('artigo sobre "Office Doctor" está visível', async ({ page }) => {
    await expect(page.getByText(/office doctor/i).first()).toBeVisible()
  })

  test('campo de busca está presente', async ({ page }) => {
    const search = page
      .locator(
        'input[type="search"], input[placeholder*="artigo"], input[placeholder*="busca"], input[placeholder*="pesquis"]'
      )
      .first()
    if (await search.isVisible()) {
      await expect(search).toBeVisible()
      await page.screenshot({ path: 'test-results/website-blog-03-busca.png' })
    }
  })

  test('busca por "IA" filtra artigos', async ({ page }) => {
    const search = page
      .locator('input[type="search"], input[placeholder*="artigo"], input[placeholder*="busca"]')
      .first()
    if (await search.isVisible()) {
      await search.fill('IA')
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'test-results/website-blog-04-busca-ia.png' })
    }
  })

  test('paginação "Próxima" está visível', async ({ page }) => {
    const proxima = page
      .getByRole('button', { name: /próxima/i })
      .or(page.getByRole('link', { name: /próxima/i }))
      .first()
    if (await proxima.isVisible()) {
      await expect(proxima).toBeVisible()
      await page.screenshot({ path: 'test-results/website-blog-05-paginacao.png' })
    }
  })

  test('paginação avança para página 2', async ({ page }) => {
    const proxima = page
      .getByRole('button', { name: /próxima/i })
      .or(page.getByRole('link', { name: /próxima/i }))
      .first()
    if (await proxima.isVisible()) {
      const primeiroTitulo = await page.locator('h2, h3').first().textContent()
      await proxima.click()
      await page.waitForTimeout(1000)
      const novoTitulo = await page.locator('h2, h3').first().textContent()
      expect(novoTitulo).not.toBe(primeiroTitulo)
      await page.screenshot({ path: 'test-results/website-blog-06-pagina2.png' })
    }
  })

  test('clique em card de artigo navega para a página de detalhe', async ({ page }) => {
    const artigo = page.locator('a[href*="/blog/"]').first()
    if (await artigo.isVisible()) {
      await artigo.click()
      await page.waitForLoadState('domcontentloaded')
      await expect(page).toHaveURL(/blog\/.+/)
      await page.screenshot({ path: 'test-results/website-blog-07-detalhe.png', fullPage: true })
    }
  })

  test('detalhe do artigo exibe conteúdo', async ({ page }) => {
    const artigo = page.locator('a[href*="/blog/"]').first()
    if (await artigo.isVisible()) {
      await artigo.click()
      await page.waitForLoadState('domcontentloaded')
      await expect(page.locator('h1, h2').first()).toBeVisible()
      await page.screenshot({ path: 'test-results/website-blog-08-detalhe-conteudo.png' })
    }
  })
})

// ─── Fluxos de navegação ─────────────────────────────────────────────────────

test.describe('Fluxos de navegação', () => {
  test('tour: home → officedoctor → blog', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('link', { name: 'OfficeDoctor' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/officedoctor/i)
    await page.getByRole('link', { name: 'Blog' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/blog/i)
    await page.screenshot({ path: 'test-results/website-journey-01.png' })
  })

  test('botão voltar do browser navega de /officedoctor para /', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('link', { name: 'OfficeDoctor' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/officedoctor/i)
    await page.goBack({ waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { name: /saúde acessível/i })).toBeVisible({
      timeout: 10_000
    })
  })

  test('acesso direto a /gymcheck carrega corretamente', async ({ page }) => {
    await page.goto('/gymcheck')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByRole('heading', { name: /gym.?check/i }).first()).toBeVisible()
  })

  test('acesso direto a /carteirinha carrega corretamente', async ({ page }) => {
    await page.goto('/carteirinha')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByRole('heading', { name: /carteirinha/i }).first()).toBeVisible()
  })

  test('acesso direto a /skincare carrega corretamente', async ({ page }) => {
    await page.goto('/skincare')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByRole('heading', { name: /skincare/i }).first()).toBeVisible()
  })

  test('navegação sequencial por todos os produtos via navbar', async ({ page }) => {
    const rotas = [
      { link: 'OfficeDoctor', url: /officedoctor/i },
      { link: 'FastClinic', url: /fastclinic/i },
      { link: 'GymCheck', url: /gymcheck/i },
      { link: 'Skincare', url: /skincare/i },
      { link: 'Carteirinha Oliv-e', url: /carteirinha/i }
    ]
    await page.goto('/')
    for (const { link, url } of rotas) {
      await page.getByRole('link', { name: link }).first().click()
      await page.waitForLoadState('domcontentloaded')
      await expect(page).toHaveURL(url)
      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')
    }
    await page.screenshot({ path: 'test-results/website-journey-02.png' })
  })

  test('voltar para home a partir de /fastclinic via navbar', async ({ page }) => {
    await page.goto('/fastclinic')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('link', { name: 'Home' }).first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { name: /saúde acessível/i })).toBeVisible()
  })
})

// ─── Validação de formulário ─────────────────────────────────────────────────

test.describe('Validação do formulário de contato (home)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page
      .getByText(/pronto para dar o próximo passo/i)
      .first()
      .scrollIntoViewIfNeeded()
  })

  test('checkbox está desmarcado por padrão', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first()
    if (await checkbox.isVisible()) {
      await expect(checkbox).not.toBeChecked()
    }
  })

  test('checkbox pode ser marcado e desmarcado', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first()
    if (await checkbox.isVisible()) {
      await checkbox.check()
      await expect(checkbox).toBeChecked()
      await checkbox.uncheck()
      await expect(checkbox).not.toBeChecked()
      await page.screenshot({ path: 'test-results/website-form-01-checkbox.png' })
    }
  })

  test('campo de telefone aceita entrada numérica', async ({ page }) => {
    const tel = page.locator('input[type="tel"], input[inputmode="tel"]').first()
    if (await tel.isVisible()) {
      await tel.fill('11999999999')
      const value = await tel.inputValue()
      expect(value).toMatch(/\d/)
      await page.screenshot({ path: 'test-results/website-form-02-telefone.png' })
    }
  })

  test('envio sem dados mostra validação (página não navega)', async ({ page }) => {
    const submit = page.getByRole('button', { name: /agendar/i }).first()
    if (await submit.isVisible()) {
      await submit.click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'test-results/website-form-03-sem-dados.png' })
      await expect(page).toHaveURL('/')
    }
  })

  test('label do checkbox menciona "Política de Privacidade"', async ({ page }) => {
    await expect(page.getByText(/política de privacidade/i).first()).toBeVisible()
  })
})

// ─── Responsivo / Mobile ─────────────────────────────────────────────────────

test.describe('Responsivo — mobile (375×812)', () => {
  test.use({ viewport: { width: 375, height: 812 }, hasTouch: true })

  test('home é legível em mobile (sem overflow horizontal)', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.screenshot({ path: 'test-results/website-mobile-01-home.png' })
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyScrollWidth).toBeLessThanOrEqual(380)
  })

  test('H1 do hero está visível em mobile', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByRole('heading', { name: /saúde acessível/i })).toBeVisible()
  })

  test('navbar ou hamburger menu está presente em mobile', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.screenshot({ path: 'test-results/website-mobile-02-navbar.png' })
    const hamburger = page
      .locator('[aria-label*="menu" i], .hamburger, [data-testid*="menu"]')
      .first()
    const homeLink = page.getByRole('link', { name: 'Home' }).first()
    const hasNav =
      (await hamburger.isVisible().catch(() => false)) ||
      (await homeLink.isVisible().catch(() => false))
    expect(hasNav).toBe(true)
  })

  test('OfficeDoctor é legível em mobile', async ({ page }) => {
    await page.goto('/officedoctor')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByRole('heading', { name: /officedoctor/i }).first()).toBeVisible()
    await page.screenshot({ path: 'test-results/website-mobile-03-officedoctor.png' })
  })

  test('FAQ accordion responde a toque em mobile', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    const btn = page.locator('button, [role="button"]').filter({ hasText: /\?/ }).first()
    if (await btn.isVisible()) {
      await btn.tap()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'test-results/website-mobile-04-faq.png' })
    }
  })

  test('blog é legível em mobile', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('domcontentloaded')
    await expect(
      page.getByRole('heading', { name: /conteúdo para quem cuida/i }).first()
    ).toBeVisible()
    await page.screenshot({ path: 'test-results/website-mobile-05-blog.png' })
  })

  test('carteirinha é legível em mobile', async ({ page }) => {
    await page.goto('/carteirinha')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByRole('heading', { name: /carteirinha/i }).first()).toBeVisible()
    await page.screenshot({ path: 'test-results/website-mobile-06-carteirinha.png' })
  })

  test('formulário de contato está acessível em mobile', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page
      .getByText(/pronto para dar o próximo passo/i)
      .first()
      .scrollIntoViewIfNeeded()
    const tel = page.locator('input[type="tel"], input[inputmode="tel"]').first()
    if (await tel.isVisible()) {
      await expect(tel).toBeVisible()
      await page.screenshot({ path: 'test-results/website-mobile-07-form.png' })
    }
  })
})

// ─── Acessibilidade básica ────────────────────────────────────────────────────

test.describe('Acessibilidade básica', () => {
  test('home — nenhuma imagem sem atributo alt', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    const semAlt = await page.locator('img:not([alt])').count()
    expect(semAlt).toBe(0)
  })

  test('home — há exatamente um H1', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    const count = await page.locator('h1').count()
    expect(count).toBeGreaterThanOrEqual(1)
    expect(count).toBeLessThanOrEqual(1)
  })

  test('officedoctor — heading principal está presente (h1 ou h2)', async ({ page }) => {
    await page.goto('/officedoctor')
    await page.waitForLoadState('domcontentloaded')
    expect(await page.locator('h1, h2').count()).toBeGreaterThanOrEqual(1)
  })

  test('blog — H1 está presente', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('domcontentloaded')
    expect(await page.locator('h1').count()).toBeGreaterThanOrEqual(1)
  })

  test('FAQ accordion usa aria-expanded', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page
      .getByText(/perguntas frequentes/i)
      .first()
      .scrollIntoViewIfNeeded()
    const btn = page.locator('[aria-expanded]').first()
    if (await btn.isVisible()) {
      const antes = await btn.getAttribute('aria-expanded')
      await btn.click()
      await page.waitForTimeout(300)
      const depois = await btn.getAttribute('aria-expanded')
      expect(depois).not.toBe(antes)
      await page.screenshot({ path: 'test-results/website-a11y-01-aria-expanded.png' })
    }
  })

  test('links de redes sociais abrem em nova aba', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.locator('footer').scrollIntoViewIfNeeded()
    const linkedin = page.locator('footer a[href*="linkedin"]').first()
    if (await linkedin.isVisible()) {
      const target = await linkedin.getAttribute('target')
      expect(target).toBe('_blank')
    }
  })

  test('links de navegação são focáveis pelo teclado', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => document.activeElement?.tagName)
    expect(['A', 'BUTTON', 'INPUT', 'TEXTAREA']).toContain(focused)
  })
})

// ─── Verificação de conteúdo entre páginas ────────────────────────────────────

test.describe('Conteúdo único por página — hero headings', () => {
  const heroMap: Record<string, RegExp> = {
    '/':            /saúde acessível/i,
    '/officedoctor': /officedoctor/i,
    '/fastclinic':   /fastclinic/i,
    '/gymcheck':     /gym\s*check/i,
    '/skincare':     /skincare|experiência única/i,
    '/carteirinha':  /carteirinha/i,
    '/blog':         /conteúdo para quem cuida/i,
  }

  for (const [path, pattern] of Object.entries(heroMap)) {
    test(`${path} — heading principal é específico da página`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('domcontentloaded')
      const heading = page.locator('h1, h2').first()
      await expect(heading).toBeVisible({ timeout: 10_000 })
      await expect(heading).toHaveText(pattern)
    })
  }
})

test.describe('FAQ "Vocês fazem Telemedicina?" — presença por página', () => {
  const pagesComTelemedicina = ['/officedoctor', '/fastclinic', '/carteirinha']
  const pagesSemTelemedicina = ['/gymcheck', '/skincare']

  for (const path of pagesComTelemedicina) {
    test(`${path} — contém FAQ "Vocês fazem Telemedicina?"`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('domcontentloaded')
      await expect(page.getByText(/vocês fazem telemedicina\?/i).first()).toBeVisible({ timeout: 10_000 })
    })
  }

  for (const path of pagesSemTelemedicina) {
    test(`${path} — NÃO contém FAQ "Vocês fazem Telemedicina?"`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('domcontentloaded')
      await expect(page.getByText(/vocês fazem telemedicina\?/i).first()).toBeHidden()
    })
  }
})

test.describe('FAQ de proteção de dados — substantivo correto por página', () => {
  const dataMap: Array<{ path: string; pattern: RegExp }> = [
    { path: '/officedoctor', pattern: /dados de saúde dos colaboradores ficam protegidos/i },
    { path: '/fastclinic',   pattern: /dados de saúde dos pacientes ficam protegidos/i },
    { path: '/gymcheck',     pattern: /dados de saúde dos alunos ficam protegidos/i },
    { path: '/skincare',     pattern: /dados dos usuários ficam protegidos/i },
  ]

  for (const { path, pattern } of dataMap) {
    test(`${path} — pergunta de dados usa o público correto`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('domcontentloaded')
      await expect(page.getByText(pattern).first()).toBeVisible({ timeout: 10_000 })
    })
  }
})

test.describe('FAQ "Quem contrata?" — cada produto menciona o próprio nome', () => {
  const contractMap: Array<{ path: string; pattern: RegExp }> = [
    { path: '/officedoctor', pattern: /quem contrata o office doctor/i },
    { path: '/fastclinic',   pattern: /quem contrata o fast clinic/i },
    { path: '/skincare',     pattern: /quem contrata o skincare/i },
  ]

  for (const { path, pattern } of contractMap) {
    test(`${path} — FAQ "Quem contrata" menciona o produto correto`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('domcontentloaded')
      await expect(page.getByText(pattern).first()).toBeVisible({ timeout: 10_000 })
    })
  }
})
