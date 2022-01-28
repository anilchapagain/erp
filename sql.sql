-- public.consinee definition
 -- Drop table
 -- DROP TABLE public.consinee;

CREATE TABLE public.consinee ( id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
                                                          "name" varchar NULL,
                                                                         code varchar NULL,
                                                                                      active bool NULL DEFAULT true);

-- public.super_comp definition
 -- Drop table
 -- DROP TABLE public.super_comp;

CREATE TABLE public.super_comp ( id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
                                                            name varchar NULL,
                                                                         active int4 NOT NULL DEFAULT 1,
                                                                                                      nos_of_user int4 NULL,
                                                                                                                       nos_of_user_created varchar NULL,
                                                                                                                                                   db_name varchar NOT NULL,
                                                                                                                                                                   "admin" varchar NOT NULL,
                                                                                                                                                                                   ip varchar NULL,
                                                                                                                                                                                              username varchar NULL,
                                                                                                                                                                                                               "password" varchar NULL,
                                                                                                                                                                                                                                  comp_email varchar NULL);
