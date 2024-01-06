const dbSql = {
  Q1: `
    INSERT INTO users (name, email, password, photo, invite_code_for_parent, invite_code_for_teacher)
    VALUES ('{var1}','{var2}','{var3}','{var4}','{var5}','{var6}')
    RETURNING *;
  `,
  Q2: `Select * from users where email = '{var1}'`,
  Q3: `
    INSERT INTO schools (name, photo , user_id)
    VALUES ('{var1}','{var2}' ,'{var3}')
    RETURNING *;
  `,
  Q4: `Select * from schools where user_id = '{var1}'`,
  Q5: `
  INSERT INTO classes (name, school_id)
  VALUES ('{var1}','{var2}')
  RETURNING *;
`,
  Q6: `Select * from classes where school_id = '{var1}'`,
  Q7: `
  INSERT INTO students (name, photo)
  VALUES ('{var1}','{var2}')
  RETURNING *;
`,
  Q8: `Select * from students`,
  Q9: `
  INSERT INTO class_students (class_id, student_id)
  VALUES ('{var1}','{var2}')
  RETURNING *;
`,
  Q10: `
  SELECT DISTINCT s.student_id, s.name, s.photo
  FROM students s
  WHERE NOT EXISTS (
    SELECT c.class_id
    FROM classes c
    WHERE NOT EXISTS (
      SELECT 1
      FROM class_students cs
      WHERE cs.class_id = c.class_id AND cs.student_id = s.student_id
    )
  );`,
  Q11: `WITH student_classes AS (
    SELECT cs.class_id
    FROM class_students cs
    WHERE cs.student_id = '{var1}'
  )
  SELECT DISTINCT s2.student_id, s2.name, s2.photo
  FROM students s1
  JOIN class_students cs1 ON s1.student_id = cs1.student_id
  JOIN student_classes sc ON cs1.class_id = sc.class_id
  JOIN class_students cs2 ON sc.class_id = cs2.class_id
  JOIN students s2 ON cs2.student_id = s2.student_id
  WHERE s1.student_id = '{var1}'
    AND s2.student_id <> '{var1}';
  `
}

function dbScript(template, variables) {
  if (variables != null && Object.keys(variables).length > 0) {
    template = template.replace(
      new RegExp("{([^{]+)}", "g"),
      (_unused, varName) => {
        return variables[varName];
      }
    );
  }
  template = template.replace(/'null'/g, null);
  return template;
}

module.exports = { dbSql, dbScript };