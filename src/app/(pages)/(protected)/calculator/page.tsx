'use client'

import {
  CalculatorInput,
  CalculatorSection,
  CalculatorTotalSection,
  ContainerWithPageTitle,
  TCalculatorInputProps
} from '@/components'
// import { toNumber } from 'lodash'
// import { Resolver, useForm, useWatch } from 'react-hook-form'
import { useMemo, useState } from 'react'

type TFormValues = {
  purchasePrice: number
  closingCosts: number
  finderFeeCost: number
  rehabExpense: number
  // totalCashIn: number
  grossRentalIncome: number
  maintenance: number
  vacancy: number
  propertyManagement: number
  capitalExpenses: number
  // rentalExpenses: number
  taxes: number
  propertyInsurance: number
  // grossIncome: number
  // netIncome: number
  // cocReturn: number
}

// const resolver: Resolver<TFormValues> = async values => {
//   const errors: { [key: string]: any } = {}

//   return {
//     values,
//     errors
//   }
// }

const CalculatorPage = () => {
  // const {
  //   register,
  //   control,
  //   formState: { errors }
  // } = useForm<TFormValues>({
  //   resolver,
  //   defaultValues: {
  //   purchasePrice: '0',
  //   closingCosts: '0',
  //   finderFeeCost: '0',
  //   rehabExpense: '0',
  //   grossRentalIncome: '0',
  //   maintenance: '0',
  //   vacancy: '0',
  //   propertyManagement: '0',
  //   capitalExpenses: '0',
  //   propertyInsurance: '0',
  //   taxes: '0'
  // }
  // })
  // const purchasePrice = (useWatch({ control, name: 'purchasePrice' }))
  // const closingCosts = useWatch({ control, name: 'closingCosts' })
  // const finderFeeCost = useWatch({ control, name: 'finderFeeCost' })
  // const rehabExpense = useWatch({ control, name: 'rehabExpense' })
  // const grossRentalIncome = useWatch({ control, name: 'grossRentalIncome' })
  // const maintenance = useWatch({ control, name: 'maintenance' })
  // const vacancy = useWatch({ control, name: 'vacancy' })
  // const propertyManagement = useWatch({ control, name: 'propertyManagement' })
  // const capitalExpenses = useWatch({ control, name: 'capitalExpenses' })
  // const taxes = useWatch({ control, name: 'taxes' })
  // const propertyInsurance = useWatch({ control, name: 'propertyInsurance' })
  // console.log(purchasePrice)
  const [values, setValues] = useState<TFormValues>({
    purchasePrice: 0,
    closingCosts: 0,
    finderFeeCost: 0,
    rehabExpense: 0,
    grossRentalIncome: 0,
    maintenance: 0,
    vacancy: 0,
    propertyManagement: 0,
    capitalExpenses: 0,
    propertyInsurance: 0,
    taxes: 0
  })
  const {
    purchasePrice,
    closingCosts,
    finderFeeCost,
    rehabExpense,
    grossRentalIncome,
    maintenance,
    vacancy,
    propertyManagement,
    capitalExpenses,
    taxes,
    propertyInsurance
  } = values
  const totalCashIn = useMemo(
    () => purchasePrice + closingCosts + finderFeeCost + rehabExpense,
    [purchasePrice, closingCosts, finderFeeCost, rehabExpense]
  )
  const rentalExpenses = useMemo(
    () =>
      (grossRentalIncome * (maintenance + vacancy + propertyManagement + capitalExpenses)) / 100,
    [grossRentalIncome, maintenance, vacancy, propertyManagement, capitalExpenses]
  )
  const grossIncome = useMemo(() => grossRentalIncome * 12, [grossRentalIncome])
  const netIncome = useMemo(
    () => grossIncome - rentalExpenses * 12 - taxes - propertyInsurance,
    [grossIncome, propertyInsurance, rentalExpenses, taxes]
  )
  const cocReturn = useMemo(() => {
    if (totalCashIn === 0) return 0
    try {
      return (netIncome / totalCashIn) * 100
    } catch (e) {
      console.log(e)
    }
    return 0
  }, [netIncome, totalCashIn])

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value)
  //   setValues(prevState => ({ ...prevState, [e.target.id]: parseInt(e.target.value, 10) || 0 }))
  // }
  const renderInput = ({
    id,
    label,
    formatType = 'currency',
    value
  }: TCalculatorInputProps & {
    id: keyof TFormValues
    label: string
    formatType?: string
    value: number
  }) => (
    // disable-eslint
    <CalculatorInput
      id={id}
      label={label}
      required
      labelClassName="font-semibold"
      inputClassName="text-right"
      formatType={formatType}
      value={value}
      onValueChange={values => {
        setValues(prevState => ({ ...prevState, [id]: values.floatValue }))
      }}
      valueIsNumericString
    />
  )
  return (
    <ContainerWithPageTitle title="Calculator" className="my-10 mx-16">
      <CalculatorSection title="Property Information" className="bg-transparent">
        <div className="flex space-x-4 mb-4">
          <h3>Property Address</h3>
          <span>123 Main St, Orange California 92911</span>
        </div>
      </CalculatorSection>
      <form className="flex flex-wrap items-stretch mx-auto">
        <div className="flex-1 flex-col m-2">
          <div className="flex-grow">
            <CalculatorSection title="Purchase Information">
              {renderInput({ id: 'purchasePrice', label: 'Purchase Price', value: purchasePrice })}
              {renderInput({ id: 'closingCosts', label: 'Closing Costs', value: closingCosts })}
              {renderInput({ id: 'finderFeeCost', label: 'FInder Fee Cost', value: finderFeeCost })}
            </CalculatorSection>
            <CalculatorSection title="Rehab Info">
              {renderInput({ id: 'rehabExpense', label: 'Rehab Expense', value: rehabExpense })}
            </CalculatorSection>
          </div>
          <CalculatorTotalSection label="Total Cash In" value={totalCashIn} prefix="$" />
        </div>
        <div className="flex-1 flex-col m-2">
          <div>
            <CalculatorSection title="Rental Information">
              {renderInput({
                id: 'grossRentalIncome',
                label: 'Gross Rental Income',
                value: grossRentalIncome
              })}
            </CalculatorSection>
            <CalculatorSection title="Rental Expenses">
              {renderInput({
                id: 'maintenance',
                label: 'Maintenance',
                value: maintenance,
                formatType: 'percent'
              })}
              {renderInput({
                id: 'vacancy',
                label: 'Vacancy',
                value: vacancy,
                formatType: 'percent'
              })}
              {renderInput({
                id: 'propertyManagement',
                label: 'Property Management',
                value: propertyManagement,
                formatType: 'percent'
              })}
              {renderInput({
                id: 'capitalExpenses',
                label: 'Capital Expenses',
                value: capitalExpenses,
                formatType: 'percent'
              })}
            </CalculatorSection>
          </div>
          <CalculatorTotalSection label="Rental Expenses" value={rentalExpenses} prefix="$" />
        </div>
        <div className="flex-1 flex-col m-2">
          <CalculatorSection title="Property Expenses">
            {renderInput({ id: 'taxes', label: 'Taxes (Annual)', value: taxes })}
            {renderInput({
              id: 'propertyInsurance',
              label: 'Property Insurance (Annual)',
              value: propertyInsurance
            })}
          </CalculatorSection>
          <CalculatorSection title="Current">
            <CalculatorTotalSection label="Gross Income" value={grossIncome} prefix="$" />
            <CalculatorTotalSection label="Net Income" value={netIncome} prefix="$" />
            <CalculatorTotalSection label="CoC Return" value={cocReturn} suffix="%" />
          </CalculatorSection>
        </div>
      </form>
    </ContainerWithPageTitle>
  )
}

export default CalculatorPage
