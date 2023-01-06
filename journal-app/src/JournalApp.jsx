import { Provider } from 'react-redux'
import { AppRouter } from './routers'
import { store } from './store/store'


function JournalApp () {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}


export default JournalApp
