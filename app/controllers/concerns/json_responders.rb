module JSONResponders
  extend ActiveSupport::Concern

  private

  def render_ok_json(status:'ok', response:nil)
    render json: { status: status, response: response }, status: 200
  end

  def render_error_json(status:'error', errors:nil)
    errors = errors.present? ? errors : ['Unknown error']

    render json: { status: status, errors: errors }, status: 400
  end
end