import { ErrorMessage } from "../../../src/common/enums/errors/error-message.enum";

const NOT_FOUND_MESSAGE = {
    error: ErrorMessage.NOT_FOUND
};

const NOT_AUTHORIZED_MESSAGE = {
    error: ErrorMessage.NOT_AUTHORIZED
};

const EMAIL_ALREADY_EXISTS_MESSAGE = {
    error: ErrorMessage.EMAIL_ALREADY_EXISTS
};

const NOT_ACCESS_RESOURCE_MESSAGE = {
    error: ErrorMessage.NOT_ACCESS_RESOURCE
};

export {
    NOT_FOUND_MESSAGE,
    NOT_AUTHORIZED_MESSAGE,
    NOT_ACCESS_RESOURCE_MESSAGE,
    EMAIL_ALREADY_EXISTS_MESSAGE
}