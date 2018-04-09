-- FUNCTION: public.select_available_time_by_discipline(timestamp without time zone, timestamp without time zone, bigint)

-- DROP FUNCTION public.select_available_time_by_discipline(timestamp without time zone, timestamp without time zone, bigint);

CREATE OR REPLACE FUNCTION public.select_available_time_by_discipline(
	range_start timestamp without time zone,
	range_end timestamp without time zone,
	for_discipline_id bigint)
    RETURNS SETOF specified_time 
    LANGUAGE 'plpgsql'

AS '

   DECLARE
   event specified_time;   
   id bigint;
   repeat_interval interval;
   start_time timestamp(4) without time zone;
   user_id bigint;
   end_time timestamp without time zone;
   next_time timestamp(4) without time zone;
   interview interviews;
   excluded_time_slot excluded_time_slots;

BEGIN
FOR event IN  SELECT * FROM specified_time 
join users on specified_time.user_id = users.id
join users_roles_disciplines on users_roles_disciplines.user_id = users.id
where users_roles_disciplines.discipline_id = for_discipline_id AND not (specified_time.end_time <= range_start OR specified_time.start_time >= range_end)
	LOOP   
    next_time = event.start_time;
	WHILE (next_time <= range_end OR next_time <= event.end_time) 
    LOOP
     SELECT * INTO interview
        FROM interviews join interviews_users on interviews.id = interviews_users.interview_id
        join users on interviews_users.user_id = users.id
        WHERE users.id = event.user_id AND interviews.start_time = next_time;
     SELECT * INTO excluded_time_slot
        FROM excluded_time_slots WHERE excluded_time_slots.user_id = event.user_id AND excluded_time_slots.start_time = next_time;
    	IF (next_time >= range_start AND next_time <= range_end AND interview is null AND excluded_time_slot is null)
          then RETURN NEXT event;
          EXIT;
        END IF;
        next_time := next_time + event.repeat_interval;
        END LOOP;
	END LOOP;
    RETURN;
END;

';

-- FUNCTION: public.select_specified_time_by_user(timestamp without time zone, timestamp without time zone, bigint)

-- DROP FUNCTION public.select_specified_time_by_user(timestamp without time zone, timestamp without time zone, bigint);

CREATE OR REPLACE FUNCTION public.select_specified_time_by_user(
	range_start timestamp without time zone,
	range_end timestamp without time zone,
	required_user_login character varying)
    RETURNS SETOF specified_time 
    LANGUAGE 'plpgsql'

AS '

   DECLARE
   event specified_time;   
   id bigint;
   repeat_interval interval;
   start_time timestamp(4) without time zone;
   user_id bigint;
   end_time timestamp without time zone;
   next_time timestamp(4) without time zone;

BEGIN
FOR event IN  SELECT * FROM specified_time 
join users on specified_time.user_id = users.id
where not (specified_time.end_time <= range_start OR specified_time.start_time >= range_end) and login = required_user_login
	LOOP   
    next_time = event.start_time;
	WHILE (next_time <= range_end OR next_time <= event.end_time) 
    LOOP
    	IF (next_time >= range_start AND next_time <= range_end)
          then RETURN NEXT event;
        END IF;
        EXIT WHEN (next_time >= range_start AND next_time <= range_end);
        next_time := next_time + event.repeat_interval;
        END LOOP;
	END LOOP;
    RETURN;
END;

';
