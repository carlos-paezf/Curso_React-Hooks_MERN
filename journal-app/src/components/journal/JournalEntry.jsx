export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div className="journal__entry-picture"
                style={ {
                    backgroundSize: "cover",
                    backgroundImage: "url(https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                } }></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">Notas para la app</p>
                <p className="journal__entry-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>20</h4>
            </div>
        </div>
    )
}