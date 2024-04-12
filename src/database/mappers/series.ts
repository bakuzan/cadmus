import { Series, SeriesViewModel } from '@/types/Series';

export function toSeriesViewModel(series: Series): SeriesViewModel {
  return {
    id: series.Id,
    name: series.Name
  };
}
