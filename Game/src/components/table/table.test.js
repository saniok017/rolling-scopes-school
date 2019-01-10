import ModalDialog from '../modal-dialog/modal-dialog';
import Table from './table';


describe('Table', () => {
  it('draw table into the body', () => {
    ModalDialog.draw();
    Table.draw();
    const bodyEl = document.querySelectorAll('.modal-body>.table');

    expect(bodyEl.length).toBe(1);
  });
});
