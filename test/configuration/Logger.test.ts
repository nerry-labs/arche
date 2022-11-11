import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { mock, instance } from 'ts-mockito';
import * as Logger from '../../src/configuration/Logger';

_chai.should();
@suite class LoggerUnitTests {

    private expectedLogger: any;

    before() {
        this.expectedLogger = Logger.Logger.getStaticLogger();
    }

    @test 'should return singleton logger'() {
        const actual = Logger.logger;
        this.expectedLogger.should.equals(actual);
    }

}
