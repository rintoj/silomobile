import { useQuery } from '@silo-feature/api'

export function useExpenseCategoriesQuery() {
  return useQuery<Array<string>>('/accounting/expenses/categories', 'expenseCategories')
}
