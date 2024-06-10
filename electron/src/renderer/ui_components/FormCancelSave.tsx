import React from 'react';

type FormCancelSaveProps = {
    cancelButtonDisabled?: boolean;
    saveButtonDisabled?: boolean;
    onCancelClick?: () => void;
    onSaveClick?: () => void;
};

const FormCancelSave: React.FC<FormCancelSaveProps> = ({
    cancelButtonDisabled,
    saveButtonDisabled,
    onCancelClick,
    onSaveClick,
}) => {
    return (
        <div className="flex flex-row gap-6">
            {/* Cancel Button */}
            <div className="w-1/2 flex flex-col">
                <button
                    type="button"
                    disabled={
                        cancelButtonDisabled != null
                            ? cancelButtonDisabled
                            : false
                    }
                    className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-semibold py-4 px-4 rounded disabled:text-slate-400 disabled:hover:bg-slate-200 disabled:cursor-not-allowed"
                    onClick={onCancelClick}
                >
                    Cancel
                </button>
            </div>
            {/* Save Button */}
            <div className="w-1/2 flex flex-col">
                <button
                    type="button"
                    disabled={
                        saveButtonDisabled != null ? saveButtonDisabled : false
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded disabled:bg-blue-300 disabled:hover:bg-blue-300 disabled:cursor-not-allowed"
                    onClick={onSaveClick}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

FormCancelSave.defaultProps = {
    cancelButtonDisabled: false,
    saveButtonDisabled: false,
    onCancelClick: () => {},
    onSaveClick: () => {},
};

export default FormCancelSave;
