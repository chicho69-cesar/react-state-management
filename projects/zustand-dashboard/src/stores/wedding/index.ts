import { create } from 'zustand'
import { devtools/* , persist */ } from 'zustand/middleware'

import { type ConfirmationSlice, createConfirmationSlice } from './confirmation.slice'
import { type DateSlice, createDateSlice } from './date.slice'
import { type GuestSlice, createGuestSlice } from './guest.slice'
import { type PersonSlice, createPersonSlice } from './person.slice';

// Crear el Store
type ShareState = ConfirmationSlice & DateSlice & GuestSlice & PersonSlice

export const useWeddingBoundStore = create<ShareState>()(
  // persist(
    devtools(
      (...a) => ({
        ...createConfirmationSlice(...a),
        ...createDateSlice(...a),
        ...createGuestSlice(...a),
        ...createPersonSlice(...a),
      })
    )/* ,
    { name: 'wedding-store' }
  ) */
)
