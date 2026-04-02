// src/components/StudentModals.jsx
import AddStudentForm from "./AddStudentForm";

export default function StudentModals({
  showAddForm,
  onCloseAdd,
  showEditModal,
  editingStudent,
  onCloseEdit,
  onAddSuccess,
  onEditSuccess,
  addStudent,
  updateStudent,
}) {
  return (
    <>
      {/* Add Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={onCloseAdd}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={onCloseAdd} className="modal-close" title="Close">
              ×
            </button>
            <AddStudentForm
              onSuccess={onAddSuccess}
              onCancel={onCloseAdd}
              editingStudent={null}
              addStudent={addStudent}
              updateStudent={updateStudent}
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingStudent && (
        <div className="modal-overlay" onClick={onCloseEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={onCloseEdit} className="modal-close" title="Close">
              ×
            </button>
            <AddStudentForm
              onSuccess={onEditSuccess}
              onCancel={onCloseEdit}
              editingStudent={editingStudent}
              addStudent={addStudent}
              updateStudent={updateStudent}
            />
          </div>
        </div>
      )}
    </>
  );
}
