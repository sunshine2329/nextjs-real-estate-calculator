This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

AWS Link: http://54.165.250.219/

![My Image](images/signin.png)
![My Image](images/signup.png)
![My Image](images/calculator.png)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Calculations for Real Estate

1. Net Income
2. Appreciation
3. Future Rental Income

```Javascript
years = 30

const purchase_price = 100000 # $100,000
const gross_annual_income = 12000 # $12,000 per year in rental income

const annual_rental_rate_increase = 0.02 # 2% annual increase
const annual_expenses_rate_increase = 0.03 # 3% annual increase

# Example initial expenses:
const tax_rate = 0.03 # 3%
const insurance_rate = 0.005 # 0.5%
const maintenance_rate = 0.1 # 10%
const management_rate = 0.1 # 10%
const vacancy_rate = 0.1 # 10%
const capital_rate = 0.05 # 5%
const appreciation_rate = 0.03 # 3% annual appreciation rate (in decimal)

const annual_property_insurance = purchase_price * insurance_rate
const annual_property_taxes = purchase_price * property_tax_rate
const annual_maintenance_costs = gross_annual_income * maintenance_rate
const annual_management_fees = gross_annual_income * management_rate
const annual_vacancy_costs = gross_annual_income * vacancy_rate
const annual_capital_expenses = gross_annual_income * capital_rate

const total_annual_expenses = annual_property_taxes + annual_property_insurance + annual_maintenance_costs + annual_management_fees + annual_vacancy_costs + annual_capital_expenses

# Store net incomes for each year
const result = [...Array(years).keys()].map(i => {
  const year_gross_income = gross_annual_income * Math.pow((1 + annual_rental_rate_increase), i)
  const year_total_expenses = total_annual_expenses * Math.pow((1 + annual_expenses_rate_increase), i)

  const net_incomes = year_gross_income - year_total_expenses
  const appreciations = purchase_price * Math.pow((1 + appreciation_rate), i)
  const total_rental_increase = Array.from(Array(years + 1).keys())
    .map(i => Math.pow(1 + rental_increase / 100, i))
    .reduce((total: number, value: number) => total + value, 0)
  const rental_incomes = gross_annual_income * total_rental_increase - gross_annual_income * i
  return {net_incomes, appreciations, rental_incomes}
})

return result
```
