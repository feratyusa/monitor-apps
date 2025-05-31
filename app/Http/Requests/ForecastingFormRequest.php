<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForecastingFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'purchase_history_id' => ['nullable', 'integer'],
            'location_id' => ['required', 'integer'],
            'buyer' => ['required', 'string'],
            'purchase_date' => ['required', 'date'],
            'amount' => ['required','integer'],
            'total_price' => ['required', 'integer'],
        ];
    }
}
