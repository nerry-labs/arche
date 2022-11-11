import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { mock, instance } from 'ts-mockito';
import { Server } from '../src/server';

_chai.should();
@suite class HelloWorldServiceUnitTests {

    private SUT: Server;

    before() {
        // this.SUT = new Server("9876");
    }

    @test 'should do something when call a method'() {
        // this.SUT.should.be.not.undefined;
    }

}
