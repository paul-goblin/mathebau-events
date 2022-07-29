import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Event} from '~/models/event.server';
import { getUpcomingEvents } from '~/models/event.server';
import { H1 } from '~/components/elementary/H1';
import { EventBox } from '~/components/home_page/EventBox';

type LoaderData = {
  upcomingEvents: Awaited<ReturnType<typeof getUpcomingEvents>>;
};

export const loader: LoaderFunction = async () => {
  const upcomingEvents = await getUpcomingEvents();
  return json<LoaderData>({ upcomingEvents });
}

export default function Index() {
  const { upcomingEvents } = useLoaderData();
  return (
    <>
      <H1>Anstehende Events:</H1>
      <div className='space-y-3' data-cy='upcoming-events'>
        {upcomingEvents.map((event: Event) => (
          <EventBox event={event} key={event.id} />
        ))}
      </div>
    </>
  );
}
