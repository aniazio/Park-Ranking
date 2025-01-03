package pl.aniazio.stronaRankingParkow.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Pointcut("within(pl.aniazio.stronaRankingParkow.controller.*)")
    public void inControllerClass() {}

    @Before("pl.aniazio.stronaRankingParkow.aspect.LoggingAspect.inControllerClass()")
    public void logBeforeControllerMethod(JoinPoint joinPoint) {
        log.debug("Before method {}, Arguments: {}", joinPoint.getSignature().toShortString(), joinPoint.getArgs());
    }

    @AfterReturning(value = "pl.aniazio.stronaRankingParkow.aspect.LoggingAspect.inControllerClass()", returning = "retVal")
    public void logAfterControllerMethod(JoinPoint joinPoint, Object retVal) {
        log.debug("After method {}, Arguments {}, Returning: {}", joinPoint.getSignature().toShortString(), joinPoint.getArgs(), retVal);
    }



}
