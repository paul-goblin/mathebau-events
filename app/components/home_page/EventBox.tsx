import { Link } from '@remix-run/react'
import type { FC } from 'react'
import type { EventWithSignups } from '~/models/event.server'
import { dateToString, todayIsBetween } from '~/utils/dates'
import { EventSignupInfo } from '../admin/events/EventSignupInfo'
import { Box } from '../elementary/Box'
import { Button } from '../elementary/Button'
import { H2 } from '../elementary/H2'
import { SplitLeftRight } from '../elementary/SplitLeftRight'
import { EventInfos } from './EventInfos'
export const EventBox:FC<{event: EventWithSignups}> = ({event}) => {
  return (
    <Box>
      <SplitLeftRight>
        <H2>{event.name}</H2>
        {todayIsBetween(dateToString(new Date(event.signupStartDate)), dateToString(new Date(event.signupEndDate))) && (
          <Link to={`/anmelden/${event.id}`}>
            {event.participantsLimit && event.signups.length >= event.participantsLimit ? (
              <Button color='amber'>Auf Warteliste setzen</Button>
            ) : (
              <Button color='lime'>Anmelden</Button>
            )}
          </Link>
        )}
      </SplitLeftRight>
      <EventInfos event={event} />
      <EventSignupInfo event={event} />
    </Box>
  )
}
