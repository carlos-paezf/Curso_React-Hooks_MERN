/**
 * The above code is creating a constant called types. This constant is an object that has two keys, login and logout. 
 * The values of these keys are strings that represent the actions that can be dispatched. 
 */
export const types = {
    login: '[Auth] login',
    logout: '[Auth] logout',

    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',
    uiStartLoading: '[UI] Start Loading',
    uiFinishLoading: '[UI] Finish Loading',

    notesAddNew: '[Notes] Add new entry',
    notesActive: '[Notes] Set active note',
    notesLoad: '[Notes] Load notes',
    notesUpdated: '[Notes] Updated note saved',
    notesFileURL: '[Notes] Updated image url',
    notesDelete: '[Notes] Deleted note',
    notesLogoutCleaning: '[Notes] Logout Cleaning'
}