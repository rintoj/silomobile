import { useAuth } from '@silo-feature/auth'
import React from 'react'
import { AddExpenseParams, AddLotExpenseForm } from './add-lot-expense-form'
import { useAddLotExpenseMutation } from './use-add-lot-expense-mutation'

interface Props {
  lotId: number
  onSuccess?: () => void
}

export function AddLotExpense({ lotId, onSuccess }: Props) {
  const { user } = useAuth()
  const { mutateAsync: addExpense, error } = useAddLotExpenseMutation(lotId)
  const onAddExpenseTap = async (expense: AddExpenseParams) => {
    await addExpense([
      {
        ...expense,
        accountID: user?.accountID ?? 0,
        distributionType: 'auto',
        type: 'lot_purchase',
        connections: [{ connectionID: lotId }],
        category: expense.isPayable ? 'Expenses' : expense.category,
        payableTo: expense.isPayable ? expense.payableTo : undefined,
        invoice: expense.isPayable ? expense.invoice : undefined,
      },
    ])
    onSuccess?.()
  }

  return <AddLotExpenseForm onSubmit={onAddExpenseTap} error={error} />
}
