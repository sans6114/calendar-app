import React from 'react';

export const CalendarEventBox = ({ event }) => {
    const { title, user } = event;
    return (
        <div className="d-flex flex-column mb-2">
            <strong>{title}</strong>
            <strong>- {user.name}</strong>
        </div>
    )
}
