import { DataView } from '@silo-component/data-view'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { format } from 'date-fns'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { LotList } from '../../purchase-order/src/lot-list'
import LocationIcon from './images/location.svg'
import { SalesOrderType, TransportMethod } from './use-sales-order-query'

interface Props {
  order?: SalesOrderType
  loading?: boolean
  error?: Error | null
  onOrderItemTap?: (orderID?: number) => void
}

export function SalesOrderView({ order, loading, error, onOrderItemTap }: Props) {
  const receivedOn = format(new Date(order?.submittedTime ?? 0), 'MMM dd, yyyy - h:mmaaa')
  // TODO: Confirm mapping of field Location. Currently mapped to order.items[].traces[].parentLocation.name
  const [item] = order?.items ?? []
  return (
    <DataView fill isLoading={loading} error={error} alignTop data={order}>
      <Spacer size='x-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Customer</Text>
          <Text fill textColor={COLOR_X.ACCENT3} fontSize='large'>
            {order?.buyer?.name}
          </Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {order?.buyer.billingAddress.street1}
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal'>
          <Text alignRight textColor={COLOR_X.ACCENT2}>
            Date
          </Text>
          <Text alignRight textColor={COLOR_X.ACCENT3} fontSize='large'>
            {receivedOn}
          </Text>
        </Stack>
      </Stack>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Type</Text>
          <Text fill textColor={COLOR_X.ACCENT3} fontSize='large'>
            {TransportMethod[order?.transportMethod ?? 0]}
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}># of units</Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {order?.items.length}
          </Text>
        </Stack>
      </Stack>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding={'horizontal:normal'}>
        <Stack fill>
          <Stack horizontal alignMiddle>
            <Text textColor={COLOR_X.ACCENT2} fontSize='large'>
              Location
            </Text>
            <Spacer size='xx-small' />
            <LocationIcon />
          </Stack>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {item?.traces[0]?.parentLotLocation.name}
          </Text>
        </Stack>
        <Spacer size='x-small' />
        <Stack fill />
      </Stack>
      <Spacer size='small' />
      <Spacer size='x-small' />
      {/* TODO: Reusing lot list from purchase order screens. Waiting for designs to get finalized.*/}
      <LotList orders={order?.items} onOrderItemTap={onOrderItemTap} />
    </DataView>
  )
}
