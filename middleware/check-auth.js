export default function (context) {
    console.log('Check Auth')
    //if (ProcessingInstruction.client) {
        context.store.dispatch('initAuth', context.req)
    //}
}