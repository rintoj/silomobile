import { DataView } from '@silo-component/data-view'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { capitalize } from '@silo/util'
import { format } from 'date-fns'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import LocationIcon from './images/location.svg'
import { LotList } from './lot-list'
import { SalesOrderType, TransportMethod } from './use-sales-order-query'

interface Props {
  order?: SalesOrderType
  loading?: boolean
  error?: Error | null
  onOrderItemTap?: (orderID?: number) => void
}

export function SalesOrderView({ order, loading, error, onOrderItemTap }: Props) {
  const receivedOn = format(new Date(order?.submittedTime ?? 0), 'MM/dd/yyyy')
  // TODO: Confirm mapping of field Location. Currently mapped to order.items[].traces[].parentLocation.name
  const [item] = order?.items ?? []
  return (
    <DataView fill isLoading={loading} error={error} alignTop data={order}>
      <Spacer size='x-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Customer</Text>
          <Text fill textColor={COLOR_X.ACCENT3}>
            {order?.buyer?.name}
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal'>
          <Text alignRight textColor={COLOR_X.ACCENT2}>
            Date
          </Text>
          <Text alignRight textColor={COLOR_X.ACCENT3}>
            {receivedOn}
          </Text>
        </Stack>
      </Stack>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Type</Text>
          <Text fill textColor={COLOR_X.ACCENT3}>
            {capitalize(TransportMethod[order?.transportMethod ?? 0])}
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}># of units</Text>
          <Text textColor={COLOR_X.ACCENT3}>{order?.items.length}</Text>
        </Stack>
      </Stack>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding={'horizontal:normal'}>
        <Stack fill>
          <Stack horizontal alignMiddle>
            <Text textColor={COLOR_X.ACCENT2}>Sold from</Text>
            <Spacer size='xx-small' />
            <LocationIcon />
          </Stack>
          <Text textColor={COLOR_X.ACCENT3}>{item?.traces[0]?.parentLotLocation.name}</Text>
        </Stack>
        <Spacer size='x-small' />
        <Stack fill>
          <Text textColor={COLOR_X.ACCENT2} alignRight>
            Ship To
          </Text>
          <Text textColor={COLOR_X.ACCENT3} alignRight>
            {order?.shipToAddress.name}
          </Text>
          <Text textColor={COLOR_X.ACCENT3} alignRight>
            {order?.shipToAddress.street1}
          </Text>
        </Stack>
      </Stack>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding={'vertical:small'}>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Customer PO#</Text>

          <Text textColor={COLOR_X.ACCENT3}>{order?.customerPurchaseOrderNumber}</Text>
        </Stack>
        <Spacer size='x-small' />
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2} alignRight>
            Sales Rep
          </Text>
          <Text textColor={COLOR_X.ACCENT3} alignRight>
            {`${order?.salesRep.firstName} ${order?.salesRep.lastName}`}
          </Text>
        </Stack>
      </Stack>
      <Stack padding='normal'>
        <Text textColor={COLOR_X.ACCENT2}>List of items</Text>
      </Stack>
      <LotList orders={order?.items} onLotTap={onOrderItemTap} />
    </DataView>
  )
}
