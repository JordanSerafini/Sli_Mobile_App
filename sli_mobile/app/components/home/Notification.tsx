import React from 'react'
import { View,Text } from 'react-native'

interface NotificationProps {
    notifications: Notification[];
    }

interface Notification {
    title: string;
    description: string;
    type: string;
    start: string;
    end: string;
    startHour: string;
    endHour: string;
}


function Notification() {

    const notifications: Notification[] = [
        {
            title: 'Meeting',
            description: 'Meeting with the team',
            type: 'meeting',
            start: '2021-08-02',
            end: '2021-08-02',
            startHour: '10:00',
            endHour: '11:00'
        },
        {
            title: 'Meeting',
            description: 'Meeting with the team',
            type: 'meeting',
            start: '2021-08-02',
            end: '2021-08-02',
            startHour: '10:00',
            endHour: '11:00'
        },
        {
            title: 'Meeting',
            description: 'Meeting with the team',
            type: 'meeting',
            start: '2021-08-02',
            end: '2021-08-02',
            startHour: '10:00',
            endHour: '11:00'
        },
        {
            title: 'Meeting',
            description: 'Meeting with the team',
            type: 'meeting',
            start: '2021-08-02',
            end: '2021-08-02',
            startHour: '10:00',
            endHour: '11:00'
        },
        {
            title: 'Meeting',
            description: 'Meeting with the team',
            type: 'meeting',
            start: '2021-08-02',
            end: '2021-08-02',
            startHour: '10:00',
            endHour: '11:00'
        },
    ];

  return (
    <View>
        <View>
            <Text>Notifications</Text>
        </View>
    </View>
  )
}

export default Notification