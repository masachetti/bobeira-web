# Frontend Card API Integration

## Summary
Integrated frontend card operations with the backend API, replacing localStorage-based card management with proper API calls.

## Changes Made

### deck-store.ts Refactored
- Removed localStorage dependency (`useLocalStorage` from `@vueuse/core`)
- Added reactive state with `cards`, `loading`, and `error` properties
- All CRUD operations now use `cardApi` from `@/services/api`
- New functions:
  - `fetchCards()` - Loads all user cards from API
  - `addCard(card)` - Creates card via POST request
  - `updateCard(cardId, cardData)` - Updates card via PUT request
  - `deleteCard(cardId)` - Deletes single card via DELETE request
  - `deleteCards(cardIds)` - Batch delete multiple cards

### Component Updates

**Deck.vue**
- Fetches cards on mount via `onMounted(() => fetchCards())`
- Shows loading state while cards are being fetched
- Uses `card.author` from API response instead of local username
- Multi-selection deletion now uses async `deleteCards()`

**CardCreationModal.vue**
- Uses async `addCard()` for card creation
- Switched from `appStore.username` to `useUserStore().username`

**CardEdit.vue**
- Uses async `updateCard()` for saving changes
- Uses `CardResponse` type from API service
- Shows card's actual author from API data

**CardSelectedOverlay.vue**
- Single card deletion now uses async `deleteCard()`
- Added `emit('close')` after successful deletion

## Architecture Notes
- Card state is now centralized in a module-level reactive object
- All components share the same card state via the composable pattern
- API errors are caught and stored in `state.error` for potential UI display
- The `cards` ref is readonly externally to enforce unidirectional data flow
