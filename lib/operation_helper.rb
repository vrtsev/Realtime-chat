module OperationHelper
  private

  def error(options, message)
    options[:errors] = message.to_s
    false
  end

  def validation_errors_for(options, model)
    options[:errors] = model.errors.full_messages.join('; ')
    false
  end
end
