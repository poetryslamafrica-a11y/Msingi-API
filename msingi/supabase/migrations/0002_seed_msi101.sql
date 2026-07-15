-- ═══════════════════════════════════════════════════════════
-- SEED: MsI-101 — Foundations of African Poetry
-- The flagship programme. 8 modules, 40 lessons (5 per module).
-- Lesson bodies are placeholders — replace body_md/video_url with
-- real content before launch.
-- ═══════════════════════════════════════════════════════════

do $$
declare
  v_school_id uuid;
  v_programme_id uuid;
  v_module_id uuid;
  v_module_titles text[] := array[
    'Oral Tradition and the Roots of African Poetry',
    'Voice, Persona, and Point of View',
    'Form: Free Verse, Praise Poetry, and Structured Forms',
    'Sound: Rhythm, Rhyme, and Musicality',
    'Language: Writing Across Mother Tongue and Colonial Language',
    'Image and Metaphor in African Poetic Tradition',
    'Editing and Revision',
    'The Capstone: Your First Collection'
  ];
  v_module_title text;
  i int;
  j int;
begin
  select id into v_school_id from public.schools where code = 'MsI-1';

  insert into public.programmes (school_id, code, title, description, credential_name, sort_order)
  values (
    v_school_id,
    'MsI-101',
    'Foundations of African Poetry',
    'The flagship entry programme of Msingi. Eight modules moving from oral tradition
     to a completed, capstone-reviewed first collection.',
    'Certificate in African Poetry Writing — Foundations',
    1
  )
  returning id into v_programme_id;

  i := 1;
  foreach v_module_title in array v_module_titles loop
    insert into public.modules (programme_id, title, description, sort_order)
    values (
      v_programme_id,
      v_module_title,
      'Module ' || i || ' of 8 — Foundations of African Poetry.',
      i
    )
    returning id into v_module_id;

    j := 1;
    while j <= 5 loop
      insert into public.lessons (
        module_id, title, content_type, estimated_minutes, sort_order
      ) values (
        v_module_id,
        v_module_title || ' — Lesson ' || j,
        (array['video','reading','audio','writing_exercise','peer_review']::module_content_type[])[j],
        18,
        j
      );
      j := j + 1;
    end loop;

    i := i + 1;
  end loop;

  -- Capstone lesson on the final module
  insert into public.lessons (module_id, title, content_type, estimated_minutes, sort_order)
  values (v_module_id, 'Capstone Submission: Your First Collection', 'capstone', 0, 6);

end $$;
