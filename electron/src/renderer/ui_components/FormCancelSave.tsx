import React from 'react';

type FormCancelSaveProps = {
    cancelButtonDisabled?: boolean;
    saveButtonDisabled?: boolean;
};

const FormCancelSave: React.FC<FormCancelSaveProps> = ({
    cancelButtonDisabled,
    saveButtonDisabled,
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
                    className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-semibold py-4 px-4 rounded disabled:cursor-not-allowed"
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
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
};

export default FormCancelSave;
