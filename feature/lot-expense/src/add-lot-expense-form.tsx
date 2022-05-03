import { Button } from '@silo-component/button'
import { ErrorPopup } from '@silo-component/error-popup'
import { Form } from '@silo-component/form'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { AccountsFormItem } from './accounts-form-item'
import { AmountFormItem } from './amount-form-item'
import { ExpenseCategoryFormItem } from './expense-category-form-item'
import { FulfillmentDateFormItem } from './fulfillment-date-form-item'
import { InvoiceNumberFormItem } from './invoice-form-item'
import { IsPayableFormItem } from './is-payable-form-item'
import { NotesFormItem } from './notes-form-item'
import { ExpenseRequest } from './use-add-lot-expense-mutation'
import { VendorFormItem } from './vendor-form-item'

export type AddExpenseParams = Pick<
  ExpenseRequest,
  'amount' | 'category' | 'serviceDate' | 'isPayable' | 'note' | 'payableTo' | 'invoice'
>

interface Props {
  loading?: boolean
  error?: Error | null
  onSubmit?: (expense: AddExpenseParams) => Promise<any>
}

export function AddLotExpenseForm({ loading, error, onSubmit }: Props) {
  const [isPayable, setIsPayable] = React.useState(false)
  const onFormSubmit = async ({
    state,
    isValid,
  }: {
    state: AddExpenseParams
    isValid: boolean
  }) => {
    console.log({ state, isValid })
    if (isValid) {
      return onSubmit?.(state)
    }
  }
  const initialState = React.useMemo(
    () => ({
      amount: '0',
      isPayable: false,
      note: '',
      category: 'Expenses',
      serviceDate: new Date().toISOString(),
    }),
    [],
  )
  const onChange = async ({ state }: { state: AddExpenseParams }) => {
    setIsPayable(state.isPayable ?? false)
  }

  return (
    <>
      <Form<AddExpenseParams> onSubmit={onFormSubmit} onChange={onChange} state={initialState}>
        {({ submitForm }) => {
          return (
            <Stack fill>
              {isPayable ? <AccountsFormItem /> : <ExpenseCategoryFormItem />}
              <Spacer size='small' />
              <FulfillmentDateFormItem />
              <Spacer size='small' />
              <AmountFormItem />
              <Spacer size='small' />
              <IsPayableFormItem />
              <Spacer size='small' />
              <NotesFormItem />
              {isPayable ? (
                <Stack>
                  <VendorFormItem />
                  <Spacer size='small' />
                  <InvoiceNumberFormItem />
                </Stack>
              ) : null}
              <Spacer size='small' />
              <Button
                rounded={false}
                fontSize='normal'
                height={52}
                onTap={submitForm}
                disabled={loading}
                loading={loading}
              >
                Add new expense
              </Button>
            </Stack>
          )
        }}
      </Form>
      {error ? <ErrorPopup error={error} title='Unable to add expense' /> : null}
    </>
  )
}
