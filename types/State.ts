import { CardState } from './Card'
import { AuthState } from './Auth'
import { SearchState } from './Search'
import { CommonState } from './Common'
import { Profile } from './Profile'
export interface State {
    cards: CardState,
    auth: AuthState,
    profile: Profile,
    search: SearchState,
    common: CommonState,
}