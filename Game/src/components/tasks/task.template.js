export default `
<section id="task" >
  <div class="modal-header">
    <h5 class="modal-title">Spell casting process</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <h2 id="task"></h2>
    <form>
      <div class="form-group">
        <label for="answer" class="col-form-label">answer:</label>
        <input type="text" class="form-control" id="answer">
      </div>
    </form>
  </div>
  <div class="modal-footer">
      <button type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
  </div>
`;
