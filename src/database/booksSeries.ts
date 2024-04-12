import db from './db';

/** Why is this a link table and not a foreign key on Books table?
 *
 *  The books table contains only information that was scrapable
 *  from the ISBN website. Any information that I am generating
 *  should not go into that table, hence the link table.
 *
 *  Perhaps consider moving it to be a foreign key on the library table?
 */

/* DATABASE WRITES */
export async function updateBookSeries(bookId: string, seriesId: string) {
  // Remove any existing links
  let result = db
    .prepare(`DELETE FROM BooksSeries WHERE BookId = ?`)
    .run(bookId);

  // Create new link if has seriesId
  if (seriesId) {
    const sql = `
    INSERT INTO BooksSeries(BookId, SeriesId)
    VALUES (:bookId, :seriesId)`;

    result = db.prepare(sql).run({
      bookId,
      seriesId
    });
  }

  return result.changes === 1;
}
