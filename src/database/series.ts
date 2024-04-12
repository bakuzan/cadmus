import db from './db';

import {
  toSeriesViewModel,
  toSeriesWithBooksViewModel
} from './mappers/series';
import getStoredProceedure from './storedProceedures';

import { Book } from '@/types/Books';
import { Series, SeriesUpdateRequest } from '@/types/Series';

function checkIfSeriesWithNameAlreadyExists(name: string) {
  const series = db.prepare(`SELECT * FROM Series WHERE Name = ?`).get(name);

  if (series) {
    return {
      success: false,
      message: `Series with Name '${name}' already exists.`
    };
  } else {
    return {
      success: true,
      message: ''
    };
  }
}

/* DATEBASE READS */
export async function getSeries() {
  const query = `
    SELECT * 
      FROM Series 
     ORDER BY Name`;

  const items = db.prepare(query).all() as Series[];
  return items.map(toSeriesViewModel);
}

export async function getSeriesById(seriesId: string) {
  const item = db
    .prepare(`SELECT * FROM Series WHERE Id = ?`)
    .get(seriesId) as Series;

  const query = getStoredProceedure('GetBooksBySeriesId');
  const books = db.prepare(query).all(seriesId) as Book[];

  return toSeriesWithBooksViewModel(item, books);
}

/* DATABASE WRITES */
export async function addSeries(name: string) {
  const processedName = name.trim();
  const response = checkIfSeriesWithNameAlreadyExists(processedName);
  if (!response.success) {
    return response;
  }

  const sql = `
    INSERT INTO Series (Name) 
    VALUES (:name)`;

  const result = db.prepare(sql).run({ name: processedName });

  return {
    success: result.changes === 1,
    message: ''
  };
}

export async function updateSeries(data: SeriesUpdateRequest) {
  const processedName = data.name.trim();
  const response = checkIfSeriesWithNameAlreadyExists(processedName);
  if (!response.success) {
    return response;
  }

  const sql = `
    UPDATE Series
       SET Name = :name
     WHERE Id = :seriesId`;

  const result = db.prepare(sql).run({
    seriesId: data.seriesId,
    name: processedName
  });

  return {
    success: result.changes === 1,
    message: ''
  };
}
