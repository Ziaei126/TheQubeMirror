import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ScholarshipApplication = ({submission}) => {
    const [scholarship, setScholarship] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    const cancel = () => {
        setSubmitted(!submitted)
        submission(null)
        

    }

    // Define validation schema using Yup
    const validationSchema = Yup.object({

        essay: Yup.string().required('Essay is required').max(400, 'Essay cannot be more than 500 characters'),
        amount: Yup.number().required('pleaes select an amount').oneOf([0.75, 0.5], 'Invalid selection')
    });

    return (
        <div className="mt-4">
            <div className="">
                <h1 className="text-lg font-bold mb-2 text-gray-900">
                    Lady Khadija (pbuh) Scholarship
                </h1>

                <div className="">
                    <p className="text-gray-700">
                        Do you consider yourself to be in financial difficulty and would like to be considered for Lady Khadija (pbuh) scholarship?
                    </p>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                type="checkbox"
                                id="applyForScholarship"
                                name="applyForScholarship"
                                className="h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                checked={scholarship}
                                onChange={(e) => setScholarship(!scholarship)}
                            />
                        </div>
                        <div className="ml-3 text-sm mb-2">
                            <label htmlFor="applyForScholarship" className="font-medium text-gray-700">
                                Yes
                            </label>
                            <p className="text-gray-500">
                                (Please only select this option if you cannot afford to make the full £305 payment per child, otherwise you'll be giving this opportunity to someone else as we have a limited budget for this)
                            </p>
                        </div>
                    </div>
                </div>
                <div className='bg-slate-100 shadow-lg rounded-lg border-gray-200 p-5'>
                {scholarship ? (!submitted ? (
                    <Formik

                        initialValues={{
                            essay: '',
                            amount: 0.75,
                            applyForScholarship: scholarship, // Include checkbox state in Formik
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            setSubmitted(!submitted)
                            console.log('Form Data:', values);
                            submission({...values, applied: true})
                        }}
                    >
                        {({ handleChange, setFieldValue }) => (
                            <Form className="space-y-6">
                                {/* Essay Field */}
                                <div>
                                    <label htmlFor="essay" className="block text-sm font-medium text-gray-700">
                                        Please briefly explain why you should receive this scholarship over others and what it means for you to be part of The Qube family
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="essay"
                                        name="essay"
                                        className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        rows="4"
                                        placeholder="Your response here..."
                                        onChange={(e) => {
                                            handleChange(e);
                                            setFieldValue('applyForScholarship', scholarship); // Update form value for validation
                                        }}
                                    />
                                    <ErrorMessage name="essay" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Amount Selection Field */}
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                        Please select the fee you can afford
                                    </label>
                                    <Field
                                        name="amount"
                                        as="select"
                                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={(e) => {
                                            handleChange(e);
                                            setFieldValue('applyForScholarship', scholarship); // Update form value for validation
                                        }}
                                    >
                                        <option value={0.75}>75%</option>
                                        <option value={0.5}>50%</option>
                                
                                    </Field>
                                    <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                ) : (<div><p>
                    Thanks for applying for the Lady Khadija(PBUH) Scholarship. We will process your application after you made payment of the amount that you declared affordable. In case you were not eligible for the Scholarship based on your application we will refund the money.
                </p>
                <div className="flex justify-start w-full">
      <button
        className=" mb-2 bg-red-500 text-white py-1 px-2 rounded-full"
        onClick={() => cancel()}
      >
        Cancel
      </button>
      </div>
                </div>)) : (
                    <p>
                        The Qube sponsors between 10-20 studens who cannot afford the fee for the term under the Lady Khadijs (PBUH) Scholarship.
                        You can take part in this sponsorship programme by making a donation of £30 on this page. £30 will pay for 10% of a fee of a sponsored student.
                    </p>
                )}</div>
            </div>
        </div>
    );
};

export default ScholarshipApplication;
