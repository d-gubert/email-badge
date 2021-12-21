import {
    IAppAccessors,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { IPreEmailSent } from '@rocket.chat/apps-engine/definition/email/IPreEmailSent'
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { IPreEmailSentContext, IEmailDescriptor } from '@rocket.chat/apps-engine/definition/email';

export class EmailBadgeApp extends App implements IPreEmailSent {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async executePreEmailSent(context: IPreEmailSentContext, _read: IRead, _http: IHttp, _persis: IPersistence, _modify: IModify): Promise<IEmailDescriptor> {
        const { email } = context;

        const count = await _read.getUserReader().getUserUnreadMessageCount('CwbrM7NdSGuyYqGwe');

        return {
            ...email,
            headers: {
                ...email.headers || {},
                'X-User-Unread-Count': String(count),
            },
        };
    }
}
