import { isNoteTypeItemsExistPipe } from './is-pinned-items-exist.pipe';

describe('IsPinnedItemsExistPipe', () => {
  it('create an instance', () => {
    const pipe = new isNoteTypeItemsExistPipe();
    expect(pipe).toBeTruthy();
  });
});
